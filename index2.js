$(() => {
  // 获取当前页面的 URL
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const id = params.get("id") || 0;

  $("#contact-me").click(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // 平滑滚动
    });
  });

  $("#con-but").click(() => {
    const name = $("#con-name").val();
    const tel = $("#con-tel").val();
    const email = $("#con-email").val();

    $.post("https://admin.arisakaworld.com/api/airsakaapi/setuser", {
      name: name,
      phone: tel,
      email: email,
    }).done(function (response) {
      const { msg } = response;
      $("#modalBody").text(msg);
      $("#myModal").modal("show");
    });
  });

  $.get(
    `https://admin.arisakaworld.com/api/airsakaapi/setlog?id=${id}&url=getnavlistzhang`,
    (res) => {}
  );

  $.get("https://admin.arisakaworld.com/api/airsakaapi/getbaseinfo", (res) => {
    const { data } = res?.data || {};
    const { banner_arr = [] } = data || {};

    let str = "";

    for (let i = 0; i < banner_arr.length; i++) {
      str += `
        <div
              class="main-slider__item"
              style="background-image: url('https://admin.arisakaworld.com${banner_arr[i]}');background-size: contain;"
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
      loop: true, // 循环播放
      autoplay: true, // 自动播放
      autoplayTimeout: 3000, // 每个项目显示的时间（毫秒）
      navText: [
        '<span class="flaticon-left-chevron"></span>',
        '<span class="flaticon-right-chevron"></span>',
      ],
    });
  });

  //调用后端接口
  $.get("https://admin.arisakaworld.com/api/airsakaapi/getnavlist2", (res) => {
    const { data = [] } = res?.data || {};
    let str = "";
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      str += `
        <li class="nav-item menu-item-has-children">
          <a href="index2.html?id=${data[i]?.id}" class="nav-link ${
        id == i ? "active" : ""
      }">${data[i]?.title}</a>
        </li>
      `;
    }

    //将str 给到nav-box
    $(".nav-box").html(str);

    const arr = data?.find((item) => item.id == id);
    const { children = [] } = arr || {};

    let str2 = "";

    for (let i = 0; i < children.length; i++) {
      str2 += `
          <div class="new-item col-md-6 col-lg-4">
                <div class="new-item__wrap">
                  <div class="new-item__image">
                    <a href="post-single_sidebar.html?id=${children[i].id}"
                      ><img src="https://admin.arisakaworld.com${children[i].img}" alt=""
                    /></a>
                  </div>
                  <div class="new-item__info">
                    <div class="h3 new-item__title">
                      <a href="post-single_sidebar.html?id=${children[i].id}"
                        >${children[i].title}</a
                      >
                    </div>
                    <div class="new-item__text">
                      ${children[i].beizhu}
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
