use KakaoTalkDB;

SELECT 
    userIdx,nickname,statusMessage, ifnull(profileImageURL,'dummy-image')as profileImageURL
FROM
    Users U
        inner JOIN
    FriendsRelation FR ON U.userIdx = FR.friendUserIdx
    where myuserIdx =13 ;
    
    select * from ChatUsers where userIdx = 14;
    
    #채팅방 사진과 타이틀 
    SELECT 
    ChatRooms.chatRoomIdx,ifnull(chatRoomImageURL,'default image')as chatRoomImageURL,chatRoomTitle
FROM
    ChatRooms
        INNER JOIN
    (SELECT 
        *
    FROM
        ChatUsers
    WHERE
        userIdx = 13) CU ON ChatRooms.chatRoomIdx = CU.chatRoomIdx;
        
        
        #최근 메세지와 시간 
        SELECT 
    chatRoomIdx, max(createdAt) createdAt, message
FROM
    Chats
GROUP BY chatRoomIdx;
        
        select * from Chats inner join (     SELECT 
    chatRoomIdx, max(createdAt) createdAt, message
FROM
    Chats
GROUP BY chatRoomIdx) L on Chats.chatRoomIdx = L.chatRoomIdx and Chats.createdAt;

#13번 유저가 속한 채팅방 사진, 최근메시지 ,시간 
SELECT 
    ChatRooms.chatRoomIdx,
    chatRoomImageUrl,
    chatRoomTitle,
    message,
    CASE
        WHEN
            (DATEDIFF(NOW(), TD.createdAt) < 1)
        THEN
            (DATE_FORMAT(TD.createdAt,
                    CONCAT(IF('%p' = 'AM', '오전', '오후'),
                            ' %l:%i')))
        WHEN (DATEDIFF(NOW(), TD.createdAt) = 1) THEN ('어제')
        WHEN (DATEDIFF(NOW(), TD.createdAt) > 1) THEN (DATE_FORMAT(TD.createdAt, '%Y-%m-%d'))
    END createdAt
FROM
    ChatRooms
        INNER JOIN
    (SELECT 
        *
    FROM
        ChatUsers
    WHERE
        userIdx = 1) CU ON ChatRooms.chatRoomIdx = CU.chatRoomIdx
        INNER JOIN
    (SELECT 
        Chats.chatRoomIdx, message, Chats.createdAt
    FROM
        Chats
    INNER JOIN (SELECT 
        chatRoomIdx, MAX(createdAt) createdAt
    FROM
        Chats
    GROUP BY chatRoomIdx) L ON Chats.chatRoomIdx = L.chatRoomIdx
        AND Chats.createdAt = L.createdAt) TD ON ChatRooms.chatRoomIdx = TD.chatRoomIdx
WHERE
    ChatRooms.status = 'A'
LIMIT 1

;
