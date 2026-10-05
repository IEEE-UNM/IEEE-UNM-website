# IEEE UNM Jekyll Website

A GitHub Pages + Jekyll website for IEEE UNM.

## Folder structure

```text
IEEE_UNM_websitetest/
├── index.html                  # homepage
├── about.html                  # about page
├── updates.html                # automatically lists posts from _posts
├── events.html                 # event/workshop archive grouped by year
├── contact.html                # contact page
├── _config.yml                 # Jekyll configuration
├── Gemfile                     # GitHub Pages/Jekyll dependencies
│
├── _includes/
│   ├── header.html              # shared header/navigation
│   └── footer.html              # shared footer
│
├── _layouts/
│   ├── default.html             # normal page layout
│   └── post.html                # individual post layout
│
├── _posts/                      # Markdown updates/events
├── _committees/                 # committee member Markdown files
├── assets/
│   ├── css/
│   │   └── style.css            # shared styling
│   └── js/
│       └── main.js              # shared JavaScript
│
├── images/                      # website and post images
└── .github/
    └── workflows/
        └── pages.yml            # GitHub Pages deployment workflow
```

## Adding a new post

Posts are written as Markdown files inside `_posts/`. The page does not need to be edited when you add a new post.

### File name

Use:

```text
YYYY-MM-DD-title.md
```

For example:

```text
2026-10-05-arduino-workshop.md
```

### Basic post format

```markdown
---
layout: post
title: "Arduino Workshop"
date: 2026-10-05 14:00:00 +0800
category: Workshop
---

Write the post content here.
```

The `layout`, `title`, `date`, and `category` fields are the normal fields used by the current post system.

### Featured image

Add an `image` field to the front matter:

```yaml
image: /images/posts/arduino-workshop/cover.jpg
```

A complete example:

```markdown
---
layout: post
title: "Arduino Workshop"
date: 2026-10-05 14:00:00 +0800
category: Workshop
image: /images/posts/arduino-workshop/cover.jpg
---

Welcome to our latest Arduino workshop.
```

The featured image is automatically shown on the individual post page and on the Updates/Event cards when the relevant template uses `page.image` or `post.image`.

If there is no `image` field, the site uses the existing image placeholder where a card/layout provides one.

## Post categories

Use the category to describe the type of post.

Recommended categories are:

```text
Event
Workshop
Announcement
Update
```

### Event

Use for an event that should appear on the Events page.

```yaml
category: Event
```

### Workshop

Use for a workshop that should appear on the Events page.

```yaml
category: Workshop
```

### Announcement

Use for announcements that should appear on Updates but not the Events archive.

```yaml
category: Announcement
```

### Update

Use for a general update/news item.

```yaml
category: Update
```

The Events page is intended to show only posts categorized as `Event` or `Workshop`. The Updates page lists all posts.

## Academic year

The Updates page supports an optional `academic_year` field for filtering.

You can explicitly set it:

```yaml
academic_year: "2026-2027"
```

Example:

```markdown
---
layout: post
title: "IEEE Day 2026"
date: 2026-10-01 10:00:00 +0800
category: Event
academic_year: "2026-2027"
image: /images/posts/ieee-day-2026/cover.jpg
---
```

If `academic_year` is omitted, the Updates page calculates the academic year from the post date using September as the start of the academic year.

## Full post example

```markdown
---
layout: post
title: "Maze Competition 2026"
date: 2026-03-01 14:00:00 +0800
category: Event
academic_year: "2026-2027"
image: /images/posts/maze-comp/cover.jpg
---

IEEE UNM hosted Maze Competition 2026 at the University of Nottingham Malaysia.

## Highlights

The event included activities, games and food for students and visitors.

### What happened

- Activity one
- Activity two
- Activity three

## More information

Visit [the event page](https://example.com) for more information.
```

## Images inside a post

### Normal Markdown image

You can place an image anywhere in the article:

```markdown
![Students at the workshop](/images/posts/arduino-workshop/workshop-1.jpg)
```

For repository-hosted images, prefer a path starting with `/images/` so Jekyll can resolve it through the site's base URL when appropriate.

### Multiple images

```markdown
![Workshop photo 1](/images/posts/arduino-workshop/workshop-1.jpg)

![Workshop photo 2](/images/posts/arduino-workshop/workshop-2.jpg)
```

## Image left / text right

For a more magazine-style article layout, use the reusable two-column block below.

```html
<div class="post-two-column">
    <div class="post-two-column-image">
        <img
            src="{{ '/images/posts/arduino-workshop/workshop-1.jpg' | relative_url }}"
            alt="Students working on an Arduino project"
        >
    </div>

    <div class="post-two-column-text">
        <h2>Workshop Highlights</h2>

        <p>
            Members learned how to build and program simple Arduino projects
            during our latest workshop.
        </p>

        <p>
            The session covered basic electronics, programming and hands-on
            circuit assembly.
        </p>
    </div>
</div>
```

On mobile, this layout should stack vertically so the image appears above the text.

## Text left / image right

Use the same component with the reverse class:

```html
<div class="post-two-column post-two-column-reverse">
    <div class="post-two-column-image">
        <img
            src="{{ '/images/posts/arduino-workshop/workshop-2.jpg' | relative_url }}"
            alt="Members testing their Arduino circuits"
        >
    </div>

    <div class="post-two-column-text">
        <h2>Hands-on Learning</h2>

        <p>
            Members worked together to test their circuits and troubleshoot
            their projects.
        </p>
    </div>
</div>
```

## Headings, paragraphs and lists

Markdown supports normal headings and text:

```markdown
## Main section

Paragraph text goes here.

### Subsection

More text here.

- First item
- Second item
- Third item
```

Numbered lists also work:

```markdown
1. First step
2. Second step
3. Third step
```

## Links

Use normal Markdown links:

```markdown
[Visit IEEE UNM](https://example.com)
```

For internal site links, use Jekyll's `relative_url` filter when writing HTML:

```html
<a href="{{ '/events.html' | relative_url }}">
    View Events
</a>
```

## Suggested image folder structure

Keeping each post's images together makes the repository easier to manage:

```text
images/
├── placeholder.svg
├── committee/
│   ├── member-one.jpg
│   └── member-two.jpg
└── posts/
    ├── event/
    │   ├── cover.jpg
    │   ├── venue.jpg
    │   └── activities.jpg
    │
    └── workshop/
        ├── cover.jpg
        ├── workshop-1.jpg
        └── workshop-2.jpg
```

## Editing posts on GitHub

You do not need to edit `updates.html` or `events.html` when adding a post.

For a new post:

1. Create a new Markdown file in `_posts/` using the `YYYY-MM-DD-title.md` naming format.
2. Add the required front matter.
3. Add the article content below the closing `---`.
4. Upload any images used by the post.
5. Commit the changes.
6. GitHub Actions will rebuild and deploy the site.

## Committee member files

Committee members use the `_committees/` collection. Each member can be added or removed without editing the About page.

Example:

```text
_committees/
└── john-tan.md
```

```yaml
---
name: "Marcus Wong"
title: "Vice President"
team: "Executive Committee"
image: "/images/committee/MarcusW.jpg"
order: 1
---
```

The `team` value determines which committee tab the member appears under, and `order` controls their position within that team.

## GitHub Pages

Push the repository to GitHub and set:

**Settings → Pages → Source → GitHub Actions**

The included workflow builds the Jekyll site and deploys it.

For this repository, the project-site settings are:

```yaml
url: "https://tofu06.github.io"
baseurl: "/IEEE_UNM_websitetest"
```

For a user or organization site at `username.github.io`, `baseurl` would normally be an empty string.
