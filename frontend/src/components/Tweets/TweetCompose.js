import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, composeTweet } from '../../store/tweets';
import TweetBox from './TweetBox';
import './TweetCompose.css';
import { useRef } from 'react';

function TweetCompose () {
  const fileRef = useRef();
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const dispatch = useDispatch();
  const author = useSelector(state => state.session.user);
  const newTweet = useSelector(state => state.tweets.new);
  const errors = useSelector(state => state.errors.tweets);

  useEffect(() => {
    return () => dispatch(clearTweetErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composeTweet(text, images)); // <-- MODIFY THIS LINE
    setImages([]);                        // <-- ADD THIS LINE
    setImageUrls([]);                     // <-- ADD THIS LINE
    setText('');
    fileRef.current.value = null;
  };

  const update = e => setText(e.currentTarget.value);

  const updateFiles = async e => {
    const files = e.target.files;
    setImages(files);
    if (files.length !== 0) {
      let filesLoaded = 0;
      const urls = [];
      Array.from(files).forEach((file, index) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          urls[index] = fileReader.result;
          if (++filesLoaded === files.length)
            setImageUrls(urls);
        }
      });
    }
    else setImageUrls([]);
  }



  return (
    <>
      <form className="compose-tweet" onSubmit={handleSubmit}>
        <input
          type="textarea"
          value={text}
          onChange={update}
          placeholder="Write your tweet..."
          required
        />
        <label>
          Images to Upload
          <input
            type="file"
            ref={fileRef}
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={updateFiles} />
        </label>
        <div className="errors">{errors?.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <div className="tweet-preview">
        <h3>Tweet Preview</h3>
        {(text || imageUrls.length !== 0) ?                  // <-- MODIFY THIS LINE
            <TweetBox tweet={{text, author, imageUrls}} /> : // <-- MODIFY THIS LINE
            undefined}
      </div>
      <div className="previous-tweet">
        <h3>Previous Tweet</h3>
        {newTweet ? <TweetBox tweet={newTweet} /> : undefined}
      </div>
    </>
  )
}

export default TweetCompose;
