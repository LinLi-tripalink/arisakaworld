$(() => {
  // 获取当前页面的 URL
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const id = params.get("id") || 0;

  $.get("http://54.224.193.99/api/airsakaapi/getbaseinfo", (res) => {
    const { data } = res?.data || {};
    const { banner_arr = [] } = data || {};

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
          <a href="index2.html?id=${i}" class="nav-link ${
        id == i ? "active" : ""
      }">${data[i]?.title}</a>
        </li>
      `;
    }

    //将str 给到nav-box
    $("#nav-box").html(str);

    const { children = [] } = data?.[id] || {};

    let str2 = "";

    for (let i = 0; i < children.length; i++) {
      str2 += `
          <div class="new-item col-md-6 col-lg-4">
                <div class="new-item__wrap">
                  <div class="new-item__image">
                    <a href="post-single_sidebar.html?id=${children[i].id}"
                      ><img src="http://54.224.193.99${children[i].img}" alt=""
                    /></a>
                  </div>
                  <div class="new-item__info">
                    <div class="h3 new-item__title">
                      <a href="post-single_sidebar.html?id=${children[i].id}"
                        >${children[i].title}</a
                      >
                    </div>
                  </div>
                </div>
          </div>
      `;
    }
    $("#news-box").html(str2);

    console.log(children);
  });
});
