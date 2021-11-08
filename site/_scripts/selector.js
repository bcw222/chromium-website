(function() {
  fetch('/pages.json').
    then(resp => resp.blob()).
    then(blob => blob.text()).
    then(
      function (text) {
        let pages = JSON.parse(text);
        let current_loc = new URL(document.location);
        let current_path = trimd(current_loc.pathname);
        let current_page = pages.indexOf(current_path) + 1;

        let current_view = current_loc.searchParams.get('view') || 'new';
        let container = document.getElementById('pages-container');
        let page_number = document.getElementById('page-number');
        let path = document.getElementById('path');
        let currentHeight = 0;

        function trimd(s) {
          var start = 0;
          var end = s.length - 1;
          while (s[end] === '/') {
            end -= 1;
          }
          return s.substr(0, end + 1);
        };

        function updatePage(new_page) {
          if (new_page > pages.length) {
            new_page = 1;
          } else if (new_page < 1) {
            new_page = pages.length;
          }
          updatePath(pages[new_page - 1]);
        }

        function updatePath(new_path) {
          new_path = trimd(new_path);
          let new_page = pages.indexOf(new_path) + 1;
          if (new_page == 0) {
            new_page = 1;
          }

          if (new_path != current_path) {
            if (current_view != 'new') {
              new_path += '?view=' + current_view;
            }
            document.location = new_path;
          } else {
            current_page = new_page;
            page_number.value = new_page;
            path.value = new_path;
          }
        }

        function changeView(evt) {
          updateView(evt.target.id);
          evt.preventDefault()
          return false;
        }

        function updateView(view) {
          document.getElementById('old-page').style.display = 'none';
          document.getElementById('new-page').style.display = 'none';
          document.getElementById('new-page').style.borderLeft = '0px';
          document.getElementById('old').classList.remove("selected");
          document.getElementById('both').classList.remove("selected");
          document.getElementById('new').classList.remove("selected");
          document.getElementById(view).classList.add("selected");
          if (view == 'old' || view == 'both') {
            document.getElementById('old-page').style.display = 'block';
          }
          if (view == 'new' || view == 'both') {
            let el = document.getElementById('new-page');
            el.style.display = 'block';
            if (view === 'both') {
              el.style.borderLeft = '1px solid black';
            }
          }

          if (view != current_view) {
            current_view = view;
            history.pushState({}, '', current_path + '?view=' + view);
          }
          for (let el of document.querySelectorAll('a')) {
            let hr = new URL(el.href);
          }
        }

        function updateIFrameLocation() {
          let iframe = document.querySelector('#old-page iframe');
          if (iframe) {
            iframe.src = '/originals' + current_path;
          }
        }

        function adjustHeight() {
          let old_el = document.querySelector('#old-page iframe');
          let new_el = document.querySelector('#new-page');
          let old_ht = old_el?.contentWindow?.document?.body?.offsetHeight || 0;
          let new_ht = new_el.offsetHeight || 0;
          let ht;
          ht = (old_ht > new_ht) ? old_ht : new_ht;
          old_el.style.height = ht + 'px';
          new_el.style.height = ht + 'px';
          setTimeout(adjustHeight, 100);
        }

        document.querySelector("#selector > form").onsubmit = function (evt) {
          evt.preventDefault();
          return false;
        }
        document.getElementById('page-number').onchange = function(evt) {
          updatePage(page_number.value);
          evt.preventDefault();
          return false;
        }
        document.getElementById('path').onchange = function(el) {
          updatePath(path.value);
          el.preventDefault();
          return false;
        }
        document.getElementById('pages').innerText = pages.length;
        document.getElementById('prev').onclick = function(el) {
          updatePage(current_page - 1);
          el.preventDefault();
          return false;
        };
        document.getElementById('next').onclick = function(el) {
          updatePage(current_page + 1);
          el.preventDefault();
          return false;
        };
        document.getElementById('old').onclick = changeView;
        document.getElementById('new').onclick = changeView;
        document.getElementById('both').onclick = changeView;

        updatePage(current_page);
        updateView(current_view);
        updateIFrameLocation();
        adjustHeight();
      })
    })();
