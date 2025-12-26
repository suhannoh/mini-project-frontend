import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AuthStore from "../../store/AuthStore";
import { logError } from "../../components/logError";
import { api } from "../../api/auth";
import Post from "../../components/Post";

export default function MyPostPage() {

  const {user} = AuthStore();
  const [posts , setPosts] = useState([]);

  useEffect(() => {
      const getPosts = async () => {
        try {
          const res = await api.get(`/post/my`, {
            params: {
              userId: user.id,
            },
          });
          setPosts(res.data);
        } catch (e) {
          logError(e);
        }
      }
      getPosts();
  },[])

  return (
    <div>
        <Layout layoutType="post">
            <div className="my__post-list">
                {posts 
                ? posts.map((post,idx) =>              
                    <Post key={post.postId} id={post.postId} idx={(idx + 1 )} title={post.title} 
                          content={post.content} view="list" list={post} />)
                : <h2> 게시글이 없습니다</h2>}
            </div>

        </Layout>
    </div>
  )
}
