$(() => {
  // 获取当前页面的 URL
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const id = params.get("id") || 0;

  $.get("http://54.224.193.99/api/airsakaapi/getbaseinfo", (res) => {
    const { data, attr } = res?.data || {};
    const { banner_arr = [] } = data || {};
    const { web_jianjie } = attr || {};

    let str = "";

    for (let i = 0; i < banner_arr.length; i++) {
      str += `
        <div
              class="main-slider__item"
              style="background-image: url('http://54.224.193.99${banner_arr[i]}');background-size: contain;"
            >
              <div class="container">
                <div class="item__content">
                  <div class="cat-title">
                  </div>
                </div>
              </div>
            </div>
      `;
    }

    $("#hero-slider").html(str);
    $("#news-box").html(web_jianjie);

    $("#hero-slider").owlCarousel({
      items: 1,
      nav: true,
      dots: false,
      navText: [
        '<span class="flaticon-left-chevron"></span>',
        '<span class="flaticon-right-chevron"></span>',
      ],
    });
  });

  //调用后端接口
  $.get("http://54.224.193.99/api/airsakaapi/getnavlist2", (res) => {
    const { data = [] } = res?.data || {};
    let str = "";
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      str += `
        <li class="nav-item menu-item-has-children">
          <a href="index2.html?id=${i}">${data[i]?.title}</a>
        </li>
      `;
    }

    //将str 给到nav-box
    $("#nav-box").html(str);
  });
});
