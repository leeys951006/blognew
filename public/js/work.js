document.addEventListener('DOMContentLoaded', function() {
  // 페이지 로드 시 저장된 글 목록을 불러와서 출력
  var savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
  var listContainer = document.getElementById('list-container');

  // 글 목록 초기 출력
  savedPosts.forEach(function(post, index) {
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
    };

    // 글 목록에 추가
    savedPosts.push(post);
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));

    // 목록에 새 글 추가
    var listItem = createListItem(post, savedPosts.length - 1);
    listContainer.appendChild(listItem);

    // 입력 필드 초기화
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
  }

  // 글 목록 항목 생성 및 클릭 이벤트 처리 함수
  function createListItem(post, index) {
    var listItem = document.createElement('li');
    listItem.textContent = post.title;
    listItem.setAttribute('data-index', index);

    // 클릭 이벤트 추가
    listItem.addEventListener('click', function() {
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
      newWindow.document.write('<header>');
      newWindow.document.write('<h1>글 보기</h1>');
      newWindow.document.write('</header>');
      newWindow.document.write('<main>');
      newWindow.document.write('<h2>' + post.title + '</h2>');
      newWindow.document.write('<p>' + post.content + '</p>');
      newWindow.document.write('</main>');
      newWindow.document.write('</body>');
      newWindow.document.write('</html>');
      newWindow.document.close();
    });

    return listItem;
  }

  // 제출 버튼 클릭 이벤트 핸들러 등록
  var submitButton = document.querySelector('#post-form button');
  submitButton.addEventListener('click', submitPost);
});
