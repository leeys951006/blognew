function submitPost() {
  var title = document.getElementById('post-title').value;
  var content = document.getElementById('post-content').value;

  if (title.trim() === '' || content.trim() === '') {
    alert('제목과 내용을 모두 입력하세요.');
    return;
  }

  var listItem = document.createElement('li');
  listItem.textContent = title;

  var listContainer = document.getElementById('list-container');
  listContainer.appendChild(listItem);

  // 입력 필드 초기화
  document.getElementById('post-title').value = '';
  document.getElementById('post-content').value = '';
}
