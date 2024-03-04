from flask import Flask, request, jsonify
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from geopy.distance import geodesic
from fuzzywuzzy import process
from flask_cors import CORS
import os
import pickle

app = Flask(__name__)
CORS(app)
# Load the saved model and DataFrame
model_path = r"./recommendation_data.pkl"  # Update with your actual path
with open(model_path, 'rb') as file:
    saved_data = pickle.load(file)

df = saved_data['df']
kmeans_model = saved_data['kmeans_model']
scaler = saved_data['scaler']

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        # Get user input from Postman
        data = request.json
        recent_location = data['recent_location']

        # Perform fuzzy matching to find the closest matching location in the dataset
        matches = process.extract(recent_location, df['location'], limit=1)

        # Unpack values from the first element of the 'matches' list
        closest_match, score, *_ = matches[0]

        # Geocode the closest matching place name to get its coordinates
        location = df[df['location'] == closest_match][['Latitude', 'Longitude']].iloc[0]
        recent_latitude, recent_longitude = location['Latitude'], location['Longitude']

        # Adding the user's recent destination to the DataFrame
        recent_df = pd.DataFrame({'Latitude': [recent_latitude], 'Longitude': [recent_longitude]})
        recent_df['Cluster'] = kmeans_model.predict(scaler.transform(recent_df[['Latitude', 'Longitude']]))

        # Generating recommendations based on the user's cluster
        user_cluster = recent_df['Cluster'].values[0]
        cluster_recommendations = df[df['Cluster'] == user_cluster][['location', 'Latitude', 'Longitude', 'tags', 'description', 'image']]

        # Calculate distances and recommend the nearest places (limited to top 5)
        cluster_recommendations['Distance'] = cluster_recommendations.apply(
            lambda row: geodesic((recent_latitude, recent_longitude), (row['Latitude'], row['Longitude'])).km, axis=1
        )

        # Exclude the user's entered location from the recommendations
        cluster_recommendations = cluster_recommendations[cluster_recommendations['location'] != closest_match]

        # Sort recommendations by distance and limit to top 5
        cluster_recommendations = cluster_recommendations.nsmallest(5, 'Distance')

        # Extract tags of the entered location
        entered_location_tags = df.loc[df['location'].str.lower() == closest_match.lower(), 'tags'].values[0]

        # Recommend places with similar tags, excluding the user's entered location
        tag_recommendations = df[
            df['tags'].apply(lambda x: any(tag in x for tag in entered_location_tags.split(','))) &
            (df['location'] != closest_match)
        ][['location', 'Latitude', 'Longitude', 'tags', 'description', 'image']]

        # Initialize 'Distance' column for tag_recommendations
        tag_recommendations['Distance'] = tag_recommendations.apply(
            lambda row: geodesic((recent_latitude, recent_longitude), (row['Latitude'], row['Longitude'])).km,
            axis=1
        )

        # Exclude the user's entered location from the tag recommendations
        tag_recommendations = tag_recommendations[tag_recommendations['location'] != closest_match]

        # Sort tag recommendations by distance and limit to top 5
        tag_recommendations = tag_recommendations.nsmallest(5, 'Distance')

        # Convert the recommendations to JSON format
        cluster_recommendations_json = cluster_recommendations.to_dict(orient='records')
        tag_recommendations_json = tag_recommendations.to_dict(orient='records')

        # Return recommendations as JSON response
        return jsonify({
            'cluster_recommendations': cluster_recommendations_json,
            'tag_recommendations': tag_recommendations_json
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True,port=5001)
