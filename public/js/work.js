// 글 목록을 저장할 배열
var posts = [];

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

  // 글 목록 배열에 추가
  posts.push(post);

  // 글 목록에 추가
  var listItem = document.createElement('li');
  listItem.textContent = title;
  listItem.setAttribute('data-index', posts.length - 1); // 글 목록에서의 인덱스 저장

  var listContainer = document.getElementById('list-container');
  listContainer.appendChild(listItem);

  // 입력 필드 초기화
  document.getElementById('post-title').value = '';
  document.getElementById('post-content').value = '';

  // 클릭 이벤트 추가
  listItem.addEventListener('click', function () {
    // 해당 글의 인덱스를 가져옴
    var index = parseInt(listItem.getAttribute('data-index'));

    // 새 창 열기
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
    newWindow.document.write('<h2>' + posts[index].title + '</h2>');
    newWindow.document.write('<p>' + posts[index].content + '</p>');
    newWindow.document.write('</main>');
    newWindow.document.write('</body>');
    newWindow.document.write('</html>');
    newWindow.document.close();
  });
}
