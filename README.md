# SSUNOVEL_front
노벨포럼
프론트

<플로우차트 기준>
- 웹사이트 실행
    - 메인 페이지 이하

- GNB 1
- GNB 2
    1. 보관함
        1. 보관함 즐겨찾기 등록, 공감하기
        2. 보관함 목록
            - 보관함의 이미지를 클릭했을 시(동적으로), 모달창의 on/off를 대응하기위해 useState훅 이용.
            - &rarr;  보관함 안의 작품 목록
                - &rarr;  해당 작품 정보 페이지
                    - 보관함과 동일한 원리로, useState(즐찾,추천), useNavigate(작품 이미지클릭시)와 useLocation(PageNovel에서 받기)사용.
        3. 보관함 검색
            - CollectionSearchBox에서 검색창에 들어간 내용(inputvalue)가 동적으로 사용되기에, router의 link대신 useNavigate훅 사용.
            - SearchedPageCollection에서는 이러한 동적으로 들어온 데이터를 받아내기 위해 useLocation훅 사용.
            - &rarr; 보관함 목록
                - 이하 생략
    2. 커뮤니티
        - 페이지네이션 사용. 10개의 페이지를 보여주나, 어떤 페이지에 위치해도 1,50은 보임.
        1. 커뮤니티 글 목록
            - &rarr; 해당 글 페이지
                - &rarr; 댓글 작성
                    - 댓글 작성후, 버튼을 누르면, 새로고침(후에 api적용)
                - &rarr; 댓글 목록
        2. 커뮤니티 글 작성
        test3..

- TOP 10 작품 목록 
    - 해당 작품 정보 페이지
        - 즐겨찾기, 공감, 작가알림 기능
