$(function () {
  //z-index 増えるから初期値設定 設定することで、表示したwindowが最前面に来る
  let maxzindex = 10;

  //ーーーーードラッグ機能ーーーーーー
  let $draggableElements = $(".mini-window");

  // ドラッグ状態を管理する変数（各要素ごとに状態を保持）
  let isDragging = Array($draggableElements.length).fill(false);

  // ドラッグ開始時のマウス座標を保持する変数（各要素ごとに状態を保持）
  let initialX = Array($draggableElements.length);
  let initialY = Array($draggableElements.length);

  // ドラッグ可能な要素にmousedownイベントを追加
  $draggableElements.on("mousedown", function (event) {
    const index = $draggableElements.index(this);
    isDragging[index] = true;

    // ドラッグ開始時のマウス座標と要素の位置を取得
    const boundingRect = this.getBoundingClientRect();
    initialX[index] = event.clientX - boundingRect.left - window.scrollX;
    initialY[index] = event.clientY - boundingRect.top - window.scrollY;

    // キャプチャされたマウスイベントを防ぐための処理
    // event.preventDefault();
    maxzindex += 1;
  });

  // ドラッグ中のmousemoveイベントをdocumentに追加
  $(document).on("mousemove", function (event) {
    $draggableElements.each(function (index) {
      if (isDragging[index]) {
        // マウスの現在の座標を取得
        const currentX = event.clientX - initialX[index];
        const currentY = event.clientY - initialY[index];

        // 要素の位置を変更
        $(this).css({
          left: `${currentX}px`,
          top: `${currentY}px`,
          zIndex: maxzindex,
        });
      }
    });
  });

  // //mini-windowタップしたら前に出てくる処理
  // $draggableElements.on("click", function () {
  //   $(this).css({
  //     zIndex: maxzindex,
  //   });
  //   maxzindex += 1;
  // });

  // ドラッグ終了時のmouseupイベントをdocumentに追加
  $(document).on("mouseup", function () {
    // 全ての要素のドラッグ状態をリセット
    isDragging.fill(false);
  });
  //-----------window表示------------

  //window取得
  const $minWindows = $(".window");
  //icon取得
  const $icon = $(".icon");
  $icon.on("click", function () {
    const $iconClassName = $(this).attr("class").split(" ")[0];
    // const $window = $draggableElements.filter(`.${$class_str}`);
    maxzindex += 1;
    const $window = $minWindows.filter(`.${$iconClassName}`);
    $window.css({
      display: "block",
      zIndex: maxzindex,
    });
  });

  // ----------画像表示機能(ドラッグ機能、×ボタン機能も内蔵)----------
  const $images = $(".image-content");
  const $main = $("main");
  $images.on("click", function () {
    //複製
    const $imageWindow = $(".image-window-damy").clone();
    //クラス名を変更
    $imageWindow.removeClass("image-window-damy");
    $imageWindow.addClass("image-window");
    console.log($imageWindow.attr("class"));
    //titleを設定
    const titleText = $(this).find("p").text();
    $imageWindow.find(".mini-header .title").text(`【画像】${titleText}`);
    //imgのsrcを設定
    const imgSrc = $(this).find("img").attr("src");
    $imageWindow.find(".mini-main .main-img").attr("src", imgSrc);
    $imageWindow.css({
      display: "block",
      zIndex: maxzindex,
    });
    //htmlに追加
    $main.append($imageWindow[0]);
    //ドラッグ機能 jqのUIライブラリ
    $imageWindow.draggable({
      handle: ".mini-main, .mini-header",
      start: function (event, ui) {
        // ドラッグが開始されるときの処理
        maxzindex += 1;
        $(this).css("z-index", maxzindex);
      },
    });

    maxzindex += 1;

    // ×ボタンのクリックイベント
    const $batubtnimg = $imageWindow.find(".batu");
    $batubtnimg.on("click", function () {
      $imageWindow.css({
        display: "none",
      });
    });
  });

  //---------×ボタン機能-----------
  const $batubtn = $draggableElements.find(".batu");
  $batubtn.on("click", function () {
    const index = $batubtn.index(this);
    const $window = $draggableElements.eq(index);
    $window.css({
      display: "none",
    });
    //曲のmini-windowなら曲を停止するために、music-stopをつける music-stopをつけると止まる
    $window.toggleClass("music-stop");
    musicStop($window);
  });

  //----------紹介表示機能----------
  const $infos = $(".info ul li");

  $infos.on("click", function () {
    console.log($(this));
    const $info = $draggableElements.filter(`.${$(this).attr("class")}`);
    $info.css({
      display: "block",
      zIndex: maxzindex,
    });
    maxzindex += 1;
  });

  //-----------日付表示機能----------------
  function sampleDate(date, format) {
    const padZero = (num) => (num < 10 ? `0${num}` : num);
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, padZero(date.getMonth() + 1));
    format = format.replace(/DD/, padZero(date.getDate()));
    format = format.replace(/hh/, padZero(date.getHours()));
    format = format.replace(/mm/, padZero(date.getMinutes()));

    return format;
  }

  function one_minitus() {
    const $time = $(".day");
    const today = new Date();
    const today_str = sampleDate(today, "YYYY/MM/DD hh:mm");
    $time.text(today_str);
  }
  one_minitus();
  setInterval(one_minitus, 1000);

  //----------アラート表示---------
  $alert = $(".alert");
  function showAlert(aleat) {
    console.log("aaaaa");
    aleat.css({
      display: "block",
    });
  }

  //-------ローディング機能---------
  const $lodingmain = $(".loading");
  const $comment = $(".first-comennt");
  const $startBtn = $(".start-btn");
  const $loginditem = $(".dot-wave__dot");

  $startBtn.on("click", function () {
    $(this).css({
      display: "none",
    });
    $comment.css({
      display: "block",
    });
    $loginditem.css({
      display: "block",
    });
    setTimeout(() => {
      $lodingmain.fadeOut();
    }, 3000);
  });

  //曲停止機能;
  function musicStop(window) {
    if (window.hasClass("music-stop")) {
      window.find(".mini-main audio")[0].pause();
      window.find(".mini-main audio")[0].currentTime = 0;
    }
    window.toggleClass("music-stop");
  }

  //-------------壁紙設定機能----------------
  const $background_img = $(".background-img");
  const $body = $("body");
  $background_img.on("click", function () {
    const imagePath = $(this).find("img").attr("src");
    const url = `url(${imagePath})`;
    $body.css({
      background: url,
      "background-size": "cover",
    });
  });

  //--------------再起動機能-------------

  // ビジーwaitを使う方法 コピペ
  function sleep(waitMsec) {
    var startMsec = new Date();

    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
  }
  //コピペ終わり

  $(".reboot-btn").on("click", function () {
    sleep(2000);
    window.location.reload();
  });

  //--------------シャットダウン機能-----------
  $(".shutdown-btn").on("click", function () {
    sleep(1000);
    // $draggableElements.each(function () {
    //   $(this).toggleClass("music-stop");
    //   musicStop($(this));
    // });
    $(".shutdown-black").css({
      display: "flex",
      zIndex: maxzindex,
    });
    maxzindex += 1;
  });

  //-------------電源機能-----------
  $(".first-btn").on("click", function () {
    sleep(1000);
    window.location.reload();
  });
  // //ーーーーーホバー機能ーーーーーー
  // const $bg = $(".bg");

  // $draggableElements.on("mouseenter", function () {
  //   const image = $(this).find(".main-img").attr("src");

  //   $bg.fadeOut("slow", function () {
  //     $bg.css({
  //       background: `url(${image})`,
  //       BackgroundSize: "cover",
  //     });
  //     $bg.fadeIn("slow");
  //   });
  // });

  // $draggableElements.on("mouseleave", function () {
  //   const image = "./img/3155.jpg";

  //   $bg.fadeOut("slow", function () {
  //     $bg.css({
  //       background: `url(${image})`,
  //       BackgroundSize: "cover",
  //     });
  //     $bg.fadeIn("slow");
  //   });
  // });
});
