import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async () => {
  const res = await api.get("/posts?_start=0&_limit=3");
  return res.status === 200 ? res.data : [];
};

export const fetchPostsOld = () =>{
    return api.get('/posts?_start=0&_limit=3');
}

export const fetchPostIndv = async (id) =>{
  try {
    // https://jsonplaceholder.typicode.com
    const res = await api.get(`/posts/${id}`)
    return res.status === 200 ? res.data : {};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const fetchPostsPagination = async (page) => {
  const res = await api.get(`/posts?_start=${page}&_limit=3`);
  return res.status === 200 ? res.data : [];
};


export const deletePost = async (id)  =>{
  try {
    return await api.delete(`posts/${id}`);
  } catch (error) {
    console.log(error)
  }
}
