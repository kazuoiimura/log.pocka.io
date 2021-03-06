<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/posts/${params.slug}.json`)
    const data = await res.json()

    if (res.status === 200) {
      return { post: data }
    } else {
      this.error(res.status, data.message)
    }
  }
</script>

<script>
  import { differenceInYears } from 'date-fns'
  import { onMount } from 'svelte'

  import Head from '../../components/Head'
  import Alert from '../../components/atoms/Alert'
  import BackToTop from '../../components/molecules/BackToTop'
  import Tags from '../../components/molecules/Tags'

  import FacebookShare from '../../components/organisms/FacebookShare'
  import HatenaBookmark from '../../components/organisms/HatenaBookmark'
  import TwitterShare from '../../components/organisms/TwitterShare'

  if (process.browser) {
    import('prismjs/themes/prism-okaidia.css')
  }

  onMount(() => {
    const hashLinks = document.querySelectorAll('[data-hash-link]')
    ;[...hashLinks].forEach(link => {
      const href = link.getAttribute('href')

      if (/^#/.test(href)) {
        link.setAttribute('href', location.pathname + href)
      }
    })

    const { hash } = location

    if (!hash) return

    const el = document.querySelector(decodeURIComponent(hash))

    if (!el) return

    window.scroll({
      top: el.getBoundingClientRect().top
    })
  })

  export let post

  const updatedAtSince = differenceInYears(new Date(), post.updatedAt) 

  $: isOlderThan1Year = updatedAtSince >= 1
  $: isOlderThan3Year = updatedAtSince >= 3

  $: url = `${process.env.SITE_ORIGIN}/posts/${post.name}/`
  $: shareTitle = `${post.title} - log.pocka.io`
  $: publicTags = post.tags.slice(1)
  $: authorUrl = `${process.env.SITE_ORIGIN}/about/`
</script>

<style>
  .meta {
    display: flex;
    align-items: center;
  }

  .meta > :global(:not(:first-child)) {
    font-size: 1em;
    margin-left: 2rem;
  }

  .updatedAt {
    color: var(--color-fg-sub);
  }

  .shares {
    display: flex;
    margin-top: calc(var(--baseline) * 2rem);
    font-size: 1.5em;
  }

  .shares > :global(:not(:nth-child(0))) {
    flex-basis: 2rem;

    text-align: center;
  }
  .shares > :global(:not(:first-child)) {
    margin-left: 0.5em;
  }
</style>

<svelte:head>
  <Head
    title={post.title}
    description={post.description}
    type="article"
    path="/posts/{post.name}/">
    <meta property="article:published_time" content={post.createdAt} />
    <meta property="article:modified_time" content={post.updatedAt} />
    <meta property="article:author" content={authorUrl} />
    {#each publicTags as tag (tag)}
      <meta property="article:tag" content={tag} />
    {/each}
    <meta name="keywords" content={publicTags.join(',')} />
  </Head>
</svelte:head>

<div class="tags" />

<h1>{post.title}</h1>
<div class="meta">
  <time class="updatedAt" datetime={post.updatedAt}>
     {post.updatedAtFormatted}
  </time>
  <Tags tags={post.tags} />
</div>

{#if isOlderThan3Year}
<Alert level="danger">
この記事は最終更新から3年以上経過しています。内容が古くなっている可能性が高いため注意してください。
</Alert>
{:else if isOlderThan1Year}
<Alert level="warning">
この記事は最終更新から1年以上経過しています。内容が古くなっている可能性があります。
</Alert>
{/if}

{@html post.__content}

<section class="shares">
  <TwitterShare {url} title={shareTitle} />
  <FacebookShare {url} />
  <HatenaBookmark {url} title={shareTitle} />
</section>

<BackToTop />
