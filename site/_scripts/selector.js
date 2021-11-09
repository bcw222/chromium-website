(function() {
  fetch('/pages.json').
    then(resp => resp.blob()).
    then(blob => blob.text()).
    then(
      function (text) {
        let pages = JSON.parse(text);
        let currentLoc = new URL(document.location);
        let currentPath = trimd(currentLoc.pathname);
        let currentView = currentLoc.searchParams.get('view') || 'new';
        let currentPage = pages.indexOf(currentPath) + 1;
        let currentHeight = 0;

        let container = document.getElementById('pages-container');
        let pageNumber = document.getElementById('page-number');
        let path = document.getElementById('path');

        function trimd(s) {
          var start = 0;
          var end = s.length - 1;
          while (s[end] === '/') {
            end -= 1;
          }
          return s.substr(0, end + 1);
        };

        function updatePage(newPage) {
          if (newPage > pages.length) {
            newPage = 1;
          } else if (newPage < 1) {
            newPage = pages.length;
          }
          updatePath(pages[newPage - 1]);
        }

        function updatePath(newPath) {
          newPath = trimd(newPath);
          let newPage = pages.indexOf(newPath) + 1;
          if (newPage === 0) {
            newPage = 1;
          }

          if (newPath != currentPath) {
            if (currentView != 'new') {
              newPath += '?view=' + currentView;
            }
            document.location = newPath;
          } else {
            currentPage = newPage;
            pageNumber.value = newPage;
            path.value = newPath;
          }
        }

        function changeView(evt) {
          updateView(evt.target.id);
          evt.preventDefault()
          return false;
        }

        function updateView(view) {
          for (let v of ['both', 'old', 'new']) {
            document.getElementById(v).classList.remove('selected');
          }
          document.getElementById(view).classList.add('selected');
          let oldPage = document.getElementById('old-page');
          let newPage = document.getElementById('new-page');
          oldPage.style.display = 'none';
          newPage.style.display = 'none';
          newPage.style.borderLeft = '0px';
          if (view === 'old' || view === 'both') {
            oldPage.style.display = 'block';
          }
          if (view === 'new' || view === 'both') {
            newPage.style.display = 'block';
            if (view === 'both') {
              newPage.style.borderLeft = '1px solid black';
            }
          }
          if (view === 'both') {
            addLabels();
          } else {
            removeLabels();
          }

          if (view != currentView) {
            currentView = view;
            history.pushState({}, '', currentPath + '?view=' + view);
          }
        }

        function updateIFrameLocation() {
          let iframe = document.querySelector('#old-page iframe');
          if (iframe) {
            iframe.src = '/originals' + currentPath;
          }
        }

        function adjustHeight() {
          let new_el = document.querySelector('#new-page');
          let new_height = new_el.offsetHeight;
          let old_el = document.querySelector('#old-page iframe');
          if (old_el) {
            let old_height = old_el.contentWindow.document.body.offsetHeight;
            let max_height = 
              (old_height > new_height) ? old_height : new_height;
            old_el.style.height = max_height + 'px';
            new_el.style.height = max_height + 'px';
          }
          setTimeout(adjustHeight, 100);
        }

        function removeLabels() {
          for (let el of document.querySelectorAll('.tab')) {
            el.parentNode.removeChild(el);
          }
        }
        function addLabels() {
          let newPage = document.querySelector('#new-page');
          addLabel(newPage, 'NEW');
          let oldPage = document.querySelector('#old-page');
          addLabel(oldPage, 'OLD');
        }

        function addLabel(el, label) {
          let d = document.createElement('div');
          d.innerText = label;
          d.className = 'tab';

          if (label === 'NEW') {
            if (el.scrollWidth > 800) {
              d.style.left = ((el.scrollWidth * 3 / 2) - 20) + 'px';
            } else {
              d.style.left = (el.scrollWidth + 380) + 'px';
            }
          } else {
            if (el.scrollWidth > 800) {
              d.style.left = ((el.scrollWidth / 2) - 20) + 'px';
            } else {
              d.style.left = '380px';
            }
          }
          d.style.top = '36px';
          el.appendChild(d);
        }
        document.querySelector("#selector > form").onsubmit = function (evt) {
          evt.preventDefault();
          return false;
        }
        document.getElementById('page-number').onchange = function(evt) {
          updatePage(pageNumber.value);
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
          updatePage(currentPage - 1);
          el.preventDefault();
          return false;
        };
        document.getElementById('next').onclick = function(el) {
          updatePage(currentPage + 1);
          el.preventDefault();
          return false;
        };
        document.getElementById('old').onclick = changeView;
        document.getElementById('new').onclick = changeView;
        document.getElementById('both').onclick = changeView;

        updatePage(currentPage);
        updateView(currentView);
        updateIFrameLocation();
        adjustHeight();

        window.onresize = () => {
          if (currentView === 'both') {
            removeLabels();
            addLabels();
          }
        };
      })
    })();
