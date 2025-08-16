---
title: "Home"
layout: page
permalink: /
---

<div class="hero">
  <img src="{{ '/assets/img/profile.jpg' | relative_url }}" alt="Profile" class="avatar" />
  <div>
    <h1>Hi, I'm {{ site.author.name }} 👋</h1>
    <p>{{ site.tagline }}</p>
    <p>
      I'm an ML engineer. This site combines a personal homepage and a blog.
      You'll find write-ups on ML systems, notes, and occasional life hacks.
    </p>
    <p><a class="button" href="{{ '/blog/' | relative_url }}">Read the Blog</a>
       <a class="button button-secondary" href="{{ '/projects/' | relative_url }}">See Projects</a></p>
  </div>
</div>

## Recent Posts
<div class="card">
<ul class="post-list">
{% assign recent = site.posts | slice: 0, 5 %}
{% for post in recent %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
  </li>
{% endfor %}
</ul>
</div>
