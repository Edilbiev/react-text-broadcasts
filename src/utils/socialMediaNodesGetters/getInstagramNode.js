export default async function getInstagramNode(url) {
  const response = await fetch(
    `https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/p/CFKwsaZjIp5/&access_token=1260168264328153|06JlTbK02xcTpl4flpOpCaZu9sc`
  );
  const body = await response.json();

  return body.html;
}
//https://www.instagram.com/p/CFKwsaZjIp5/?utm_source=ig_web_button_share_sheet
