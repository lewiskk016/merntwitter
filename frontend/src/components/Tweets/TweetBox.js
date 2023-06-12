import "./TweetBox.css"


function TweetBox ({ tweet: { text, author, imageUrls }}) { // <-- MODIFY THIS LINE
  const { username, profileImageUrl } = author;
  // ADD THE IMAGE PROCESSING BELOW
  const images = imageUrls?.map((url, index) => {
    return <img className="tweet-image" key ={url} src={url} alt={`tweetImage${index}`} />
  });

    return (
      <div className="tweet">
        <h3>
          {profileImageUrl ?
            <img className="profile-image" src={profileImageUrl} alt="profile"/> :
            undefined
          }
          {username}
        </h3>
        <p>{text}</p>
        {images}      {/* ADD THIS LINE */}
      </div>
    );
  }

export default TweetBox;
