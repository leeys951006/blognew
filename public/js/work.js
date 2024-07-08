document.addEventListener('DOMContentLoaded', function () {
  var Worksave = JSON.parse(localStorage.getItem('Worksave')) || [];
  var listContainer = document.getElementById('list-container');
  var commentsPerPage = 10;

  // 초기 목록 출력
  Worksave.forEach(function (post, index) {
    var listItem = createListItem(post, index);
    listContainer.appendChild(listItem);
  });

  // 제출 함수
  function submitPost() {
    var title = document.getElementById('post-title').value;
    var content = document.getElementById('post-content').value;

    if (title.trim() === '' || content.trim() === '') {
      alert('제목과 내용을 모두 입력하세요.');
      return;
    }

    // 새로운 글 객체 생성
    var post = {
      title: title,
      content: content,
      comments: [], // 댓글을 위한 배열 추가
    };

    // 글 목록에 추가
    Worksave.push(post);
    localStorage.setItem('Worksave', JSON.stringify(Worksave));

    // 목록에 새 글 추가
    var listItem = createListItem(post, Worksave.length - 1);
    listContainer.appendChild(listItem);

    // 입력 필드 초기화
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
  }

  // 글 목록 항목 생성 및 클릭 이벤트 처리 함수
  function createListItem(post, index) {
    var listItem = document.createElement('li');

    // 제목을 h1 태그로 설정
    var titleElement = document.createElement('h4');
    titleElement.textContent = post.title;
    listItem.appendChild(titleElement);

    listItem.setAttribute('data-index', index);

    // 삭제 버튼 추가
    var deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.classList.add('delete-button'); // 삭제 버튼에 클래스 추가
    deleteButton.addEventListener('click', function (event) {
      event.stopPropagation(); // 이벤트 버블링 방지

      deletePost(index);
      listContainer.removeChild(listItem); // 목록에서 해당 항목 제거
    });
    listItem.appendChild(deleteButton);

    // 클릭 이벤트 추가
    listItem.addEventListener('click', function () {
      viewPost(post, index);
    });

    return listItem;
  }

  // 삭제 함수
  function deletePost(index) {
    Worksave.splice(index, 1);
    localStorage.setItem('Worksave', JSON.stringify(Worksave));
  }

  // 글 보기 함수
  function viewPost(post, index) {
    var newWindow = window.open('', '_blank');
    newWindow.document.write('<!DOCTYPE html>');
    newWindow.document.write('<html lang="ko">');
    newWindow.document.write('<head>');
    newWindow.document.write('<meta charset="UTF-8">');
    newWindow.document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    newWindow.document.write('<title>글 보기</title>');
    newWindow.document.write('<link rel="stylesheet" href="../css/work.css">');
    newWindow.document.write('</head>');
    newWindow.document.write('<body>');
    newWindow.document.write('<a id="logo-link" href="main.html">');
    newWindow.document.write('<div id="logo">');
    newWindow.document.write(
      '<img src="https://st2.depositphotos.com/14460936/43756/v/450/depositphotos_437568958-stock-illustration-vector-businessman-trying-reduce-stress.jpg" alt="stres사진">'
    );
    newWindow.document.write('</div>');
    newWindow.document.write('</a>');
    newWindow.document.write('<header>');
    newWindow.document.write('<h1>글 보기</h1>');
    newWindow.document.write('</header>');
    newWindow.document.write('<main>');
    newWindow.document.write('<h2>' + post.title + '</h2>');
    newWindow.document.write('<p>' + post.content + '</p>');
    newWindow.document.write('<h3>댓글</h3>');
    newWindow.document.write('<ul id="comment-list"></ul>');
    newWindow.document.write('<div id="comment-pagination"></div>');
    newWindow.document.write('<div id="fixed-comment">');
    newWindow.document.write('<textarea id="comment-content" placeholder="댓글을 입력하세요"></textarea>');
    newWindow.document.write('<button id="submit-comment">댓글 작성하기</button>');
    newWindow.document.write('</div>');
    newWindow.document.write('</main>');
    newWindow.document.write('</body>');
    newWindow.document.write('</html>');
    newWindow.document.close();

    function renderComments(page) {
      var commentList = newWindow.document.getElementById('comment-list');
      var pagination = newWindow.document.getElementById('comment-pagination');
      commentList.innerHTML = '';
      pagination.innerHTML = '';

      var start = (page - 1) * commentsPerPage;
      var end = start + commentsPerPage;
      var paginatedComments = post.comments.slice(start, end);

      paginatedComments.forEach(function (comment) {
        var commentItem = newWindow.document.createElement('li');
        commentItem.textContent = comment.content + ' (' + comment.date + ')';
        commentList.appendChild(commentItem);
      });

      var totalPages = Math.ceil(post.comments.length / commentsPerPage);
      for (var i = 1; i <= totalPages; i++) {
        var pageButton = newWindow.document.createElement('button');
        pageButton.textContent = i;
        if (i === page) {
          pageButton.style.fontWeight = 'bold';
        }
        pageButton.addEventListener(
          'click',
          (function (page) {
            return function () {
              renderComments(page);
            };
          })(i)
        );
        pagination.appendChild(pageButton);
      }
    }

    newWindow.document.getElementById('submit-comment').onclick = function () {
      var commentContent = newWindow.document.getElementById('comment-content').value;

      if (commentContent.trim() === '') {
        alert('댓글 내용을 입력하세요.');
        return;
      }

      // 현재 날짜와 시간 가져오기
      var currentDate = new Date();
      var formattedDate = currentDate.toLocaleString();

      // 댓글 추가
      var comment = {
        content: commentContent,
        date: formattedDate,
      };
      post.comments.push(comment);
      localStorage.setItem('Worksave', JSON.stringify(Worksave));

      // 댓글 목록 업데이트
      renderComments(Math.ceil(post.comments.length / commentsPerPage));

      // 댓글 입력 필드 초기화
      newWindow.document.getElementById('comment-content').value = '';
    };

    // 기존 댓글 목록 표시
    renderComments(1);
  }

  // 제출 버튼 클릭 이벤트 핸들러 등록
  var submitButton = document.querySelector('#post-form button');
  submitButton.addEventListener('click', submitPost);
});
