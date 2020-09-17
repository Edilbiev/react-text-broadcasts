export default async function getInstagramNode(url) {
  const response = await fetch(
    `https://graph.facebook.com/v8.0/instagram_oembed?url=${url}/&access_token=1260168264328153|06JlTbK02xcTpl4flpOpCaZu9sc`,
    {
      method: "GET",
    }
  );
  const body = await response.json();

  return body.html;
}
