// app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

type PostData = {
    title: string;
    date: string;
    contentHtml: string;
};

async function getPostData(slug: string): Promise<PostData> {
    const postsDir = path.join(process.cwd(), 'contents');
    const filePath = path.join(postsDir, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { data, content } = matter(fileContent);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        title: data.title,
        date: data.date,
        contentHtml,
    };
}

type PageProps = {
    params: {
        slug: string;
    };
};

export default async function PostPage({ params }: PageProps) {
    const postData = await getPostData(params.slug);

    return (
        <article>
            <h1>{postData.title}</h1>
            <p>{postData.date}</p>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    );
}
