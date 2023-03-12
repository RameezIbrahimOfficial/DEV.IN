import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react"
import Card from "./Card"
import FriendInfo from "./FriendInfo"
import PostCard from "./PostCard"

export default function ProfileContent({activeTab,userId}) {
        const [posts,setPosts] = useState([]);
        const [profile,setProfile] = useState(null);

        const supabase = useSupabaseClient();
        useEffect(  () => {
          if (!userId){
            return;
          }
          if(activeTab === 'posts') {
            loadPosts().then(()=>{})
          }
        }, [userId])
        

        async function loadPosts() {
            const posts =await userPosts(userId);
            const profile = await userProfile(userId);
            setPosts(posts);
            setProfile(profile);

        }

        async function userPosts(userId) {
            const {data} = await supabase
                .from('posts')
                .select('id, content, created_at, author')
                .eq('author', userId)
            return data;
        }
        async function userProfile(userId){
            const {data} = await supabase
                .from('profiles')
                .select()
                .eq('id',userId)
            return data?.[0];
        }
    return(
       <div>
        {activeTab === 'posts' && (
            <div>
                {posts?.length > 0 && posts.map(post => (
                    <PostCard key={post.created_at} {...post} profiles={profile}/>
                ))}
            </div>
        )}
        {activeTab === 'about' && (
            <div>
                <Card>
                    <h2 className="text-3xl mb-2">About me</h2>
                    <h3 className="mb-2 text-sm">Hi iam me and it is what it is and u Hi iam me and it is what it is and u Hi iam me and it is what it is and uHi iam me and it is what it is and u</h3>
                    <h3 className="mb-2 text-sm">Hi iam me and it is what it is and u Hi iam me and it is what it is and u Hi iam me and it is what it is and uHi iam me and it is what it is and u</h3>
                </Card>
            </div>
        )}
        {activeTab === 'friends' && (
            <div>
                <Card>
                    <h2 className="text-3xl mb-2">Friends</h2>
                    <div className="">
                        <div className="broder-b broder-b-gray-100 p-4 -mx-4">
                            <FriendInfo/>
                        </div>
                        <div className="broder-b broder-b-gray-100 p-4 -mx-4">
                            <FriendInfo/>
                        </div>
                        <div className="broder-b broder-b-gray-100 p-4 -mx-4">
                            <FriendInfo/>
                        </div>
                        <div className="broder-b broder-b-gray-100 p-4 -mx-4">
                            <FriendInfo/>
                        </div>
                        <div className="broder-b broder-b-gray-100 p-4 -mx-4">
                            <FriendInfo/>
                        </div>
                        <div className="broder-b broder-b-gray-100 p-4 -mx-4">
                            <FriendInfo/>
                        </div>
                        <div className="broder-b broder-b-gray-100 p-4 -mx-4">
                            <FriendInfo/>
                        </div>
                    </div>
                </Card>
            </div>
        )}
        {activeTab === 'photos' && (
            <div>
                <Card>
                    <div className="grid  md:grid-cols-2 gap-4">
                        <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                            <img src="https://images.unsplash.com/photo-1601581875039-e899893d520c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
                        </div>
                        <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                            <img src="https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
                        </div>
                        <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                            <img src="https://plus.unsplash.com/premium_photo-1668155006607-90b0ee71a3c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80" />
                        </div>
                        <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                            <img src="https://images.unsplash.com/photo-1504512485720-7d83a16ee930?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=904&q=80"/>
                        </div>
                    </div>
                </Card>
            </div>
        )}
       </div>
)}