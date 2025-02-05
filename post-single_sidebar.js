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
    `https://admin.arisakaworld.com/api/airsakaapi/setlog?id=${id}&url=getwenzhang`,
    (res) => {}
  );

  //调用后端接口
  $.get("https://admin.arisakaworld.com/api/airsakaapi/getnavlist2", (res) => {
    const { data = [] } = res?.data || {};
    let str = "";
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      str += `
          <li class="nav-item menu-item-has-children">
            <a href="index2.html?id=${data[i]?.id}" class="nav-link">${data[i]?.title}</a>
          </li>
        `;
    }

    //将str 给到nav-box
    $("#nav-box").html(str);
  });

  //调用后端接口
  $.get(
    `https://admin.arisakaworld.com/api/airsakaapi/getwenzhang?id=${id}`,
    (res) => {
      const { data, child = [] } = res?.data || {};
      $("#title").html(data?.title);
      $("#title2").html(data?.title);
      $("#post__content").html(data.content);

      let str = "";

      for (let i = 0; i < child.length; i++) {
        str += `
           <li class="widget-post">
                      <div class="widget-post__img">
                        <a href="post-single_sidebar.html"
                          ><img src="https://admin.arisakaworld.com${child[i].img}" alt=""
                        /></a>
                      </div>
                      <div class="widget-post__content">
                        <div class="h4 widget-post__title">
                          <a href="post-single_sidebar.html?id=${child[i].id}"
                            >${child[i]?.title}</a
                          >
                          <div style="font-size: 12px" class="new-item__text">${child[i]?.beizhu}</div>
                        </div>
                      </div>
                    </li>
        `;
      }

      $("#widget-post-list").html(str);

      console.log(data);
    }
  );
});
