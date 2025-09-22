'use client';
import React, { useState } from "react";

const herbs = [
  "Ashwagandha",
  "Brahmi",
  "Curry Leaves",
  "Fenugreek (Methi)",
  "Ginger",
  "Holy Basil (Tulsi)",
  "Lemongrass",
  "Mint (Pudina)",
  "Tamarind",
  "Turmeric",
];

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (url) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

// Helper function to convert YouTube URL to embed URL
const getEmbedUrl = (url) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const sampleVideos = {
  Ashwagandha: [
    { 
      title: "Ashwagandha Benefits", 
      url: "https://youtu.be/EHRWOhjIrDU",
      thumbnail: "https://img.youtube.com/vi/EHRWOhjIrDU/maxresdefault.jpg"
    },
    { 
      title: "How to Use Ashwagandha", 
      url: "https://www.youtube.com/watch?v=3sCpfv9Ci3M",
      thumbnail: "data:image/jpeg;base64,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DpXWh+qjCfdD4t2biMnK8n/1sP5L1Ls9+xHr/RUri/Cf+8MmGxZlN/iYRV+eUkfwq8cBbUDff86Vunjzq78+RIIiLexCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAsHttZogguK4cUfPQ+6oczchLeYPzXqGOw+dhA35KE4R2byy99KfEDbWjYeZPMrzdfppvTTFMc9+0ImMtfZHgeT7+QU8imt6NPM+Z/JWhEWyxZps0RRSRGGt4XDK02pJa5IgVclSu081ysZewuvX+wCw4FgGTd+ZGgsIDB1v4jR5V4FOcX4B3pzA07a6tRMWCkgblG1kk1zPNUeHPibpXb/JthxS9lzAC9s73sFARkficNbvltsssZhxLA6M7O0r5/0Wc7pHtIab01HNa43UGcgS7+35lU3qMT5YW2qs9UF2ahPhZtkcRVfhJbp0Fj6riYHOxE87ASGHxVtV5f0V44X2dJke/MQ1xzAZdNR1vXWz7rtj7JBrXNa+g67FdVFFmqeU1XYjhFYXFCaKgaNA2d75Hy6K7YOLKxregHz5/VR3CeAxwgaZiOZv6qXV9m1NGZlTduRVxAiIr1IiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICxcwHcLJEEfiuDQv3ZR6jQrbgMAyJtNv1O660UYhORERSgREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf//Z"
    },
  ],
  Brahmi: [
    { 
      title: "Brahmi for Memory", 
      url: "https://www.youtube.com/watch?v=McaQWb6AZg4",
      thumbnail: "data:image/jpeg;base64,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"
    }
  ],
  Ginger: [
    { 
      title: "Why Ginger is Powerful", 
      url: "https://www.youtube.com/watch?v=7GvZqnbQ-Ac",
      thumbnail: "data:image/jpeg;base64,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"
    }
  ],
};

export default function Tutorials() {
  const [selectedHerb, setSelectedHerb] = useState("Ashwagandha");
  const [search, setSearch] = useState("");
  const [playingVideo, setPlayingVideo] = useState(null);

  const videos = sampleVideos[selectedHerb] || [];
  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleVideoClick = (videoIndex) => {
    setPlayingVideo(videoIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white/60 backdrop-blur-xl p-4 shadow-2xl">
      <button 
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mr-4"
          >
            <svg 
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        <h2 className="text-xl font-bold mb-4 text-green-900">Herbs Playlist</h2>
        <div className="flex flex-col gap-2">
          {herbs.map((herb) => (
            <button
              key={herb}
              onClick={() => {
                setSelectedHerb(herb);
                setPlayingVideo(null); // Reset playing video when switching herbs
              }}
              className={`p-2 rounded-xl font-medium transition-all duration-200 ${
                selectedHerb === herb
                  ? "bg-green-700 text-white shadow-lg"
                  : "bg-green-200 text-green-900 hover:bg-green-300"
              }`}
            >
              {herb}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-200"
          />
        </div>

        {/* Back Button and Title */}
        <div className="flex items-center mb-6">
          
          <h1 className="text-3xl font-bold text-green-900">
            {selectedHerb} Tutorials
          </h1>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                {playingVideo === index ? (
                  <iframe
                    src={getEmbedUrl(video.url)}
                    title={video.title}
                    className="w-full h-48"
                    allowFullScreen
                  />
                ) : (
                  <div 
                    className="relative w-full h-48 cursor-pointer group"
                    onClick={() => handleVideoClick(index)}
                  >
                    <img 
                      src={video.thumbnail || getYouTubeThumbnail(video.url)} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDMyMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNDQgODBMMTc2IDk2TDE0NCAxMTJWODBaIiBmaWxsPSIjNjI3RjYzIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjI3RjYzIiBmb250LXNpemU9IjEyIj5WaWRlbyBOb3QgQXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-200">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-6 h-6 ml-1 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l8-5-8-5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-green-900 hover:text-green-700 transition-colors duration-200">
                  {video.title}
                </h3>
                <p className="text-sm text-green-600 mt-1">{selectedHerb}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-green-600 text-lg">No videos found for &ldquo;{search}&rdquo;</div>
            <p className="text-green-500 mt-2">Try adjusting your search or select a different herb</p>
          </div>
        )}
      </div>

      {/* Recommended Videos */}
      <div className="w-80 bg-white/60 backdrop-blur-xl p-4 shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-green-900">Recommended</h2>
        <div className="flex flex-col gap-3">
          {Object.keys(sampleVideos).flatMap((herb) =>
            sampleVideos[herb].map((video, i) => (
              <div
                key={herb + i}
                className="flex gap-3 items-center bg-green-100 rounded-xl p-3 hover:bg-green-200 cursor-pointer transition-colors duration-200"
                onClick={() => {
                  setSelectedHerb(herb);
                  setPlayingVideo(null);
                }}
              >
                <div className="w-20 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={video.thumbnail || getYouTubeThumbnail(video.url)}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMTZBMzRBIi8+CjxwYXRoIGQ9Ik0zMiAyMEw0NCAyNEwzMiAyOFYyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-green-900 truncate">{video.title}</p>
                  <p className="text-xs text-green-600 mt-1">{herb}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}