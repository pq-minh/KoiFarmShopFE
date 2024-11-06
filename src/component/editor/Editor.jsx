import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import api from "../../config/axios";
import { Input, message,Button } from 'antd'; // Import Ant Design components

const EditorTiny = () => {
    const [editorContent, setEditorContent] = useState("");
    const [title, setTitle] = useState(""); 
    const [error, setError] = useState("");
    const [post, setPost] = useState(null);
    console.log(title,editorContent);
    const handlePost = async () => {    
        try {
            const response = await api.post("post/createpost", {
                title:title,
                content: editorContent,
                userId: "1", 
                typePost: "Article" 
            });      
            setPost(response.data);       
            setTitle("");
            setEditorContent("");
            message.success("Bài viết đã được tạo thành công!"); 
        } catch (error) {
            setError("Có lỗi xảy ra khi tạo bài viết.");
        }
    };

    const editorInitConfig = {
        plugins: ['link image media table'],
        toolbar: 'undo redo | bold italic | link image media | triggersave',
    };

    return (
        <div>
            <Input
                placeholder="Nhập tiêu đề bài viết"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-3"
            />
            {error && <div className="text-danger mb-2">{error}</div>}

            <Editor
                apiKey='5vfuvxpotrl1a8msxyojdrr04fjd3vzyb4wrg05pqk5764tz'
                onEditorChange={(newValue) => setEditorContent(newValue)}
                init={editorInitConfig}
                value={editorContent}
            />
             <Button type="primary" onClick={handlePost} className="mt-3">
                Đăng bài
            </Button>
            {post && (
                <div className="mt-5">
                    <h2>{post.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            )}
        </div>
    );
};

export default EditorTiny;
