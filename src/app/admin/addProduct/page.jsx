'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    author: "zain",
    authorImg: "https://api.dicebear.com/9.x/notionists/svg",
  });

  const categories = [
    'Technology',
    'Business',
    'Marketing',
    'Design',
    'Development',
    'SEO',
    'Social Media'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!data.category) {
      toast.error('Please select a category');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('authorImg', data.authorImg);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if(response.data.success) {
        toast.success('Blog post created successfully!');
        setImage(null);
        setData({
          title: '',
          description: '',
          category: '',
          author: "zain",
          authorImg: "https://api.dicebear.com/9.x/notionists/svg",
        });
        document.getElementById('dropzone-file').value = '';
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.message) {
            toast.error(`Server error: ${error.response.data.message}`);
          } else {
            toast.error(`Server responded with status ${error.response.status}`);
          }
        } else {
          toast.error(`Server error: ${error.response.statusText}`);
        }
      } else if (error.request) {
        toast.error('No response received from server');
      } else {
        toast.error(`Request setup error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-stone-950 dark:text-white mb-6">Create New Blog Post</h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-stone-100 dark:bg-gray-800 text-stone-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter blog title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Category*</label>
              <select
                name="category"
                value={data.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-stone-100 dark:bg-gray-800 text-stone-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Content*</label>
              <textarea
                rows={8}
                name="description"
                value={data.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-stone-100 dark:bg-gray-800 text-stone-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Write your blog content here..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Featured Image*</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg cursor-pointer bg-stone-100 dark:bg-gray-800 hover:bg-stone-200 dark:hover:bg-gray-700">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-stone-500 dark:text-stone-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-stone-500 dark:text-stone-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {image ? image.name : 'SVG, PNG, JPG or GIF (MAX. 800x400px)'}
                    </p>
                  </div>
                  <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    onChange={handleImageChange}
                    required
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-stone-700 dark:text-stone-300 font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setData({
                    title: '',
                    description: '',
                    category: '',
                    author: "zain",
                    authorImg: "https://api.dicebear.com/9.x/notionists/svg",
                  });
                  setImage(null);
                  document.getElementById('dropzone-file').value = '';
                }}
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-md transition-colors"
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default page