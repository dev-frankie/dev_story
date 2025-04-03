import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

type PostMeta = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
};

async function getPostsMeta(): Promise<PostMeta[]> {
    const postsDir = path.join(process.cwd(), 'contents');
    const filenames = fs.readdirSync(postsDir);

    return filenames.map((filename) => {
        const filePath = path.join(postsDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        return {
            slug: filename.replace(/\.md$/, ''),
            title: data.title,
            date: data.date,
            excerpt: content.slice(0, 150) + '...',
        };
    });
}

export default async function BlogPage() {
    const posts = await getPostsMeta();

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>
                            <a>{post.title}</a>
                        </Link>
                        <p>{post.excerpt}</p>
                        <small>{post.date}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
