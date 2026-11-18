// 1. CREATE - नवीन ब्लॉग तयार करणे (create-blog.html साठी)
const blogForm = document.getElementById('blogForm');

if (blogForm) {
    blogForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // तुमच्या HTML मधील id नुसार 'blogTitle' आणि 'content' घेणे
        const title = document.getElementById('blogTitle').value;
        const content = document.getElementById('content').value; // तुमच्या HTML मधील content च्या id नुसार बदल करा (उदा. blogContent असल्यास तो टाका)

        try {
            const response = await fetch('http://localhost:5000/api/blogs', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                alert('ब्लॉग यशस्वीरित्या तयार झाला!');
                window.location.href = 'dashboard.html'; // यशस्वी झाल्यावर डॅशबोर्डवर जाणे
            } else {
                alert('ब्लॉग सेव्ह करण्यात अडचण आली.');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('सर्व्हर कनेक्ट होत नाहीये.');
        }
    });
}

// 2. READ - डॅशबोर्डवर सर्व ब्लॉग्स दाखवणे (dashboard.html साठी)
async function loadBlogs() {
    try {
        const res = await fetch('http://localhost:5000/api/blogs');
        const blogs = await res.json();
        
        const blogContainer = document.getElementById('blogContainer'); // तुमच्या HTML मधील लिस्ट कंटेनरचा ID
        
        if (blogContainer) {
            blogContainer.innerHTML = '';
            
            blogs.forEach(blog => {
                blogContainer.innerHTML += `
                    <div class="blog-card" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px;">
                        <h3>${blog.title}</h3>
                        <p>${blog.content}</p>
                        <button onclick="deleteBlog('${blog._id}')" style="background: red; color: white; padding: 5px 10px; border: none; cursor: pointer;">Delete</button>
                    </div>
                `;
            });
        }
    } catch (err) {
        console.error('Error loading blogs:', err);
    }
}

// 3. DELETE - ब्लॉग डिलीट करणे
async function deleteBlog(id) {
    if (confirm('तुम्हाला खरोखर हा ब्लॉग डिलीट करायचा आहे का?')) {
        try {
            const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                alert('ब्लॉग डिलीट झाला आहे.');
                loadBlogs(); // लिस्ट रिफ्रेश करण्यासाठी
            }
        } catch (err) {
            console.error('Error deleting blog:', err);
        }
    }
}

// जर आपण डॅशबोर्ड पेजवर असू, तर आपोआप ब्लॉग्स लोड करा
if (window.location.pathname.includes('dashboard.html')) {
    loadBlogs();
}
// ब्लॉग एडिट करण्यासाठी (Update)
async function editBlog(id) {
    const newTitle = prompt('नवीन शीर्षक (Title) प्रविष्ट करा:');
    const newContent = prompt('नवीन मजकूर (Content) प्रविष्ट करा:');

    if (newTitle && newContent) {
        try {
            const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle, content: newContent })
            });

            if (res.ok) {
                alert('ब्लॉग यशस्वीरित्या अपडेट झाला!');
                loadBlogs(); // लिस्ट रिफ्रेश करण्यासाठी
            }
        } catch (err) {
            console.error('Error updating blog:', err);
        }
    }
}