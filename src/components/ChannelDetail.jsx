import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState();

  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=data`)
      .then((data) => setVideos(data?.items));
  }, [id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{ background: "linear-gradient(to right, #b993d6, #8ca6db)", zIndex: 10, height: "300px" }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px"/>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{mr: {sm: "100px"}}} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail