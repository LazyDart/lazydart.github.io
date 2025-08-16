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
