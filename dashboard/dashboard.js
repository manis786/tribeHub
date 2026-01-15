// 1. Firebase functions
import { ref, push, set, get, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { database } from "../config.js";

// 2. User Info
const currentUserId = localStorage.getItem("user_uid");
const userName = localStorage.getItem("userName") || "User"; 

if (!currentUserId) {
    window.location.href = "../login/login.html";
}

// 3. HTML Elements
const postA = document.getElementById('postA');       
const postInput = document.getElementById('postinp'); 
const postNowBtn = document.getElementById('postNow'); 
const userGreet = document.querySelector('.wlcm');
const postsContainer = document.getElementById('postsContainer');

if(userGreet) userGreet.innerText = `Welcome ${userName}!`;

// --- 4. Function: Data Load Karna (GET Method) ---
async function loadPosts() {
    console.log("Working: Loading Posts...");
    const postsRef = ref(database, `all_posts`);
    
    try {
        const snapshot = await get(postsRef);
        postsContainer.innerHTML = ""; 

        if (snapshot.exists()) {
            const data = snapshot.val();
            // Newest posts first
            Object.keys(data).reverse().forEach(postId => {
                renderSinglePost(postId, data[postId]);
            });
        } else {
            postsContainer.innerHTML = "<p style='text-align:center;'>No posts yet.</p>";
        }
    } catch (error) { console.error("Error:", error); }
}

function renderSinglePost(postId, post) {
    const likesCount = post.likes ? Object.keys(post.likes).length : 0;
    const commentsCount = post.comments ? Object.keys(post.comments).length : 0;


    
    // const postTime = post.timestamp ? new Date(post.timestamp).toLocaleString([], { 
    //     day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    // }) : "Just now";
    const postdate = moment(post.timestamp);

    let commentsHTML = "";
    if (post.comments) {
    Object.values(post.comments).reverse().forEach(c => {
        commentsHTML += `<div style="border-bottom:1px solid #ddd; padding:8px; font-size:14px; color: #222;">
            <b style="color: #000;">${c.user}:</b> ${c.text}
        </div>`;
    });
}

    const card = document.createElement('div');
    card.style.cssText = "background:white; padding:20px; margin-top:15px; border-radius:12px; border:1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1);";
    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <strong style="color:#333;">${post.author}</strong>
            <small style="color:#999;">${postdate.fromNow()}</small>
        </div>
        
        <p style="font-size:16px; color:#444; margin-bottom:15px;">${post.content}</p>
        
        <div style="border-top:1px solid #220606ff; border-bottom:1px solid #0e0303ff; padding:10px 0; display:flex; gap:20px;">
            <button onclick="handleLike('${postId}')" style="cursor:pointer; border:none; background:none; color:#007bff; font-weight:bold;">
                👍 Like (${likesCount})
            </button>
            <button onclick="toggleComment('${postId}')" style="cursor:pointer; border:none; background:none; color:#007bff; font-weight:bold;">
                💬 Comment (${commentsCount})
            </button>
        </div>

        <div id="comments-${postId}" style="margin-top:10px; max-height:150px; overflow-y:auto; background:#f9f9f9; border-radius:8px; padding:5px;">
            ${commentsHTML || "<small style='color:Black;'>No comments yet...</small>"}
        </div>

        <div id="box-${postId}" style="display:none; margin-top:10px;">
            <div style="display:flex; gap:5px;">
                <input type="text" id="inp-${postId}" placeholder="Write a comment..." style="flex:1; padding:8px; border-radius:5px; border:1px solid #ccc;">
                <button onclick="handleComment('${postId}')" style="background:#28a745; color:Black; border:none; border-radius:5px; padding:0 15px; cursor:pointer;">Send</button>
            </div>
        </div>
    `;
    postsContainer.appendChild(card);
}

// --- 6. Global Actions ---
postA.onclick = () => {
    postInput.style.display = "block";
    postNowBtn.style.display = "block";
    postA.style.display = "none";
};

postNowBtn.onclick = async () => {
    const text = postInput.value.trim();
    if (!text) return alert("Kuch likho bhai!");

    const postsRef = ref(database, `all_posts`);
    await push(postsRef, {
        author: userName,
        uid: currentUserId,
        content: text,
        timestamp: serverTimestamp()
    });

    postInput.value = "";
    
    loadPosts();
};

window.handleLike = async (id) => {
    const likeRef = ref(database, `all_posts/${id}/likes/${currentUserId}`);
    const snap = await get(likeRef);
    if (snap.exists()) await remove(likeRef);
    else await set(likeRef, true);
    loadPosts();
};

window.toggleComment = (id) => {
    const box = document.getElementById(`box-${id}`);
    box.style.display = box.style.display === "none" ? "block" : "none";
};

window.handleComment = async (id) => {
    const inp = document.getElementById(`inp-${id}`);
    if (!inp.value.trim()) return;

    const commRef = push(ref(database, `all_posts/${id}/comments`));
    await set(commRef, { user: userName, text: inp.value });
    inp.value = "";
    loadPosts();
};

loadPosts();

document.querySelector(".logoutbtn").onclick = () => {
    localStorage.clear();
    window.location.href = "../../index.html";
};