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

// Types
type Video = { title: string; url: string; thumbnail?: string };

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (url: string): string | null => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

// Helper function to convert YouTube URL to embed URL
const getEmbedUrl = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const sampleVideos: Record<string, Video[]> = {
  Ashwagandha: [
    { 
      title: "Ashwagandha Benefits", 
      url: "https://youtu.be/EHRWOhjIrDU",
      thumbnail: "https://img.youtube.com/vi/EHRWOhjIrDU/maxresdefault.jpg"
    },
    { 
      title: "How to Use Ashwagandha", 
      url: "https://www.youtube.com/watch?v=3sCpfv9Ci3M",
      thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMTZBMzRBIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjkwIiByPSI0MCIgZmlsbD0iIzIyNTc1MyIvPgo8cGF0aCBkPSJNMTQ1IDc1TDE3NSA5MEwxNDUgMTA1VjczWiIgZmlsbD0id2hpdGUiLz4KPHR4ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPkFzaHdhZ2FuZGhhPC90ZXh0Pgo8L3N2Zz4K"
    }
  ],
  Brahmi: [
    { 
      title: "Brahmi for Memory", 
      url: "https://www.youtube.com/watch?v=McaQWb6AZg4",
      thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMDY5MjQ5Ii8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjkwIiByPSI0MCIgZmlsbD0iIzAzNTYyNSIvPgo8cGF0aCBkPSJNMTQ1IDc1TDE3NSA5MEwxNDUgMTA1VjczWiIgZmlsbD0id2hpdGUiLz4KPHR4ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPkJyYWhtaTwvdGV4dD4KPC9zdmc+Cg=="
    }
  ],
  Ginger: [
    { 
      title: "Why Ginger is Powerful", 
      url: "https://www.youtube.com/watch?v=7GvZqnbQ-Ac",
      thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjU5RTBCIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjkwIiByPSI0MCIgZmlsbD0iI0Q5NzQwNiIvPgo8cGF0aCBkPSJNMTQ1IDc1TDE3NSA5MEwxNDUgMTA1VjczWiIgZmlsbD0id2hpdGUiLz4KPHR4ZXh0IHg9IjE2MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPkdpbmdlcjwvdGV4dD4KPC9zdmc+Cg=="
    }
  ],
};

export default function Tutorials() {
  const [selectedHerb, setSelectedHerb] = useState<string>("Ashwagandha");
  const [search, setSearch] = useState<string>("");
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [recommendedOpen, setRecommendedOpen] = useState<boolean>(false);

  const videos: Video[] = sampleVideos[selectedHerb] || [];
  const filteredVideos = videos.filter((v: Video) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleVideoClick = (videoIndex: number) => {
    setPlayingVideo(videoIndex);
  };

  const handleHerbSelect = (herb: string) => {
    setSelectedHerb(herb);
    setPlayingVideo(null);
    setSidebarOpen(false); // Close mobile sidebar after selection
  };

  return (
    <div className="text-black min-h-screen bg-gradient-to-r from-green-100 to-green-200">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/80 backdrop-blur-md shadow-lg p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 px-3 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg 
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium text-sm">Back</span>
          </button>

          <h1 className="text-lg font-bold text-green-900 truncate mx-2">
            {selectedHerb} Tutorials
          </h1>

          <div className="flex gap-2">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <button 
              onClick={() => setRecommendedOpen(!recommendedOpen)}
              className="p-2 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition-colors duration-200 lg:hidden"
              aria-label="Toggle recommended videos"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen lg:min-h-auto">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-72 lg:w-64 xl:w-80
          text-black bg-white/80 backdrop-blur-xl p-4 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarOpen ? 'lg:mt-0' : 'lg:mt-0'}
          overflow-y-auto
        `}>
          {/* Desktop Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="hidden lg:flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
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

          <div className="flex items-center justify-between mb-4 lg:block">
            <h2 className="text-lg lg:text-xl font-bold text-green-900">Herbs Playlist</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-green-700 hover:bg-green-100 rounded-lg transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {herbs.map((herb) => (
              <button
                key={herb}
                onClick={() => handleHerbSelect(herb)}
                className={`p-3 lg:p-2 xl:p-3 rounded-xl font-medium text-sm lg:text-base transition-all duration-200 text-left ${
                  selectedHerb === herb
                    ? "bg-green-700 text-white shadow-lg transform scale-105"
                    : "bg-green-200 text-green-900 hover:bg-green-300 hover:scale-102"
                }`}
              >
                {herb}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 min-w-0">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-green-900">
              {selectedHerb} Tutorials
            </h1>
          </div>

          {/* Search Bar */}
          <div className="mb-4 lg:mb-6">
            <input
              type="text"
              placeholder="Search videos..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-200 text-sm lg:text-base"
            />
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredVideos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative">
                  {playingVideo === index ? (
                    <iframe
                      src={getEmbedUrl(video.url)}
                      title={video.title}
                      className="w-full h-36 sm:h-40 lg:h-48"
                      allowFullScreen
                    />
                  ) : (
                    <div 
                      className="relative w-full h-36 sm:h-40 lg:h-48 cursor-pointer group"
                      onClick={() => handleVideoClick(index)}
                    >
                      <img 
                        src={video.thumbnail || getYouTubeThumbnail(video.url) || ""} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDMyMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNDQgODBMMTc2IDk2TDE0NCAxMTJWODBaIiBmaWxsPSIjNjI3RjYzIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjI3RjYzIiBmb250LXNpemU9IjEyIj5WaWRlbyBOb3QgQXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-200">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <svg className="w-4 h-4 lg:w-6 lg:h-6 ml-1 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5v10l8-5-8-5z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 lg:p-4">
                  <h3 className="font-semibold text-sm lg:text-base text-green-900 hover:text-green-700 transition-colors duration-200 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-green-600 mt-1">{selectedHerb}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <div className="text-green-600 text-lg">No videos found for &quot;{search}&quot;</div>
              <p className="text-green-500 mt-2">Try adjusting your search or select a different herb</p>
            </div>
          )}
        </div>

        {/* Mobile Recommended Videos Overlay */}
        {recommendedOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
            onClick={() => setRecommendedOpen(false)}
          />
        )}

        {/* Recommended Videos Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 right-0 z-50 lg:z-auto
          w-80 lg:w-72 xl:w-80 2xl:w-96
          bg-white/80 backdrop-blur-xl p-4 shadow-2xl
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${recommendedOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          overflow-y-auto
          ${recommendedOpen ? 'lg:block' : 'lg:block'}
        `}>
          <div className="flex items-center justify-between mb-4 lg:block">
            <h2 className="text-lg lg:text-xl font-bold text-green-900">Recommended</h2>
            <button 
              onClick={() => setRecommendedOpen(false)}
              className="lg:hidden p-2 text-green-700 hover:bg-green-100 rounded-lg transition-colors duration-200"
              aria-label="Close recommended videos"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {Object.keys(sampleVideos).flatMap((herb) =>
              sampleVideos[herb].map((video, i) => (
                <div
                  key={herb + i}
                  className="flex gap-3 items-center bg-green-100 rounded-xl p-3 hover:bg-green-200 cursor-pointer transition-colors duration-200"
                  onClick={() => {
                    handleHerbSelect(herb);
                    setRecommendedOpen(false);
                  }}
                >
                  <div className="w-16 h-10 lg:w-20 lg:h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={video.thumbnail || getYouTubeThumbnail(video.url) || ""}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMTZBMzRBIi8+CjxwYXRoIGQ9Ik0zMiAyMEw0NCAyNEwzMiAyOFYyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm font-medium text-green-900 truncate">{video.title}</p>
                    <p className="text-xs text-green-600 mt-1">{herb}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}