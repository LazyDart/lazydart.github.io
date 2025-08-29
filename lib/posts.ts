import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { title } from "process";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");

        const { data } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
        };
    });

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const { data, content } = matter(fileContents);

    return {
        slug,
        meta: {
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            theme: data.theme,
        },
        content, 
    };
}