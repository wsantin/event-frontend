import React, { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router";
import Plot from 'react-plotly.js';
import { AttachMoney } from "@mui/icons-material";
import Chip from '@mui/material/Chip';
import { Button, ButtonGroup, Grid, Paper, Container ,Typography } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { useDispatch, useSelector } from "react-redux";

import MiniTable from '../../../components/UI/MiniTable'
import { messagesColumns } from '../shared/MessagesColumns'
import { messagesDetailsColumns } from '../shared/MessagesDetailColumns'
import { getMessageDetailsById} from '../../../api/Message'

import { COLOR_STATUS_MESSAGE_OBJ } from '../../../constants/defaultValues'

// import { fetchGoldsKarats } from "../redux/slices/goldsKaratsSlice";
// import EditPricesForm from "../components/Detail/EditPricesForm";
// import PricesTable from "../components/Detail/PricesTable";

function Detail(props) {
  const { messageId } = useParams();
  const history = useHistory();

  const message = history.location.state?.message || null

  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [ dataDetail, setDataDetail] = useState([])
  const [ balancedUsed, setBalancedUsed] = useState(null)

  const [ statusPie ] = useState(['Queue','In process', 'Success', 'Failed', 'Canceled'])
  const [ colorPie ] = useState([
    COLOR_STATUS_MESSAGE_OBJ['schedule'], COLOR_STATUS_MESSAGE_OBJ['in_process'],
    COLOR_STATUS_MESSAGE_OBJ['sent'], COLOR_STATUS_MESSAGE_OBJ['failed'], COLOR_STATUS_MESSAGE_OBJ['canceled'], 
  ])
  const [ valuesPie, setValuesPe] = useState([
    message?.message_detail_queue, message?.message_detail_in_proccess,
    message?.message_detail_success, message?.message_detail_failed])

  
  const [ showInformation, setShowInformation] = useState(true)

  const _getMessageDetailsById = useCallback(() => {
    setIsLoadingDetail(true)
    getMessageDetailsById(messageId)
      .then((res) => {
        const { data } = res;
        setDataDetail(data);
        setIsLoadingDetail(false);
        
        let queueTotal = 0
        let inProcessTotal = 0
        let sendTotal = 0
        let failedTotal = 0
        let canceledTotal = 0
        let balancedUsed = 0
        data && data.map( (value) =>{
          if(value.status=='schedule') queueTotal +=1
          else if(value.status=='create' || value.status=='in_process') inProcessTotal +=1
          else if(value.status=='sent') {
            sendTotal = sendTotal + 1;
            balancedUsed = balancedUsed + value.price;
          }
          else if(value.status=='failed') failedTotal +=1
          else if(value.status=='canceled') canceledTotal +=1
        })

        setBalancedUsed(balancedUsed)
        setValuesPe([queueTotal, inProcessTotal, sendTotal,failedTotal, canceledTotal])
      })
      .catch(() => {
        setIsLoadingDetail(false);
      });
  }, [messageId]);

  const handlerResend= useCallback( (messageId)=>{
    console.log("messageId: ",messageId)
    // history.push({pathname: `${type}/detail`});
  }, [])

  useEffect( () => {
    // if(!['customers', 'operators'].includes(messageId)){
    //   history.push('/dashboard');
    // }
    if(!message) 
      history.push('/dashboard/messages');

    _getMessageDetailsById()
    // _getUserDetailsBasicById()

  }, [messageId, message]);

  console.log("message1: ",message)
  return (
    <>
      <Grid container spacing={3} sx={{ mb: 1 }} >
        <Grid item xs={12} sm={7} sx={{ textAlign: { xs: "center", sm: "left"}, }} order={{ xs: 2, sm: 1 }}>
          <Box
            component={Paper}
            elevation={0}
            // align="center"
            // mb={1}
            sx={{
              borderRadius: 3,
              p: 3,
              mb: 5,
            }}
          > 
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                m: 1,
                bgcolor: 'background.paper',
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="500" color="textSecondary" pt={2}>
                  <strong>Messages</strong> 
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
              
                <Typography variant="h6" fontWeight="500" color="textSecondary"  pt={2}>
                  <strong>BALANCE USED <span>&nbsp;&nbsp;</span> </strong> 
                </Typography>
                <Typography variant="h3" fontWeight="300" color="textSecondary">
                  { parseFloat(balancedUsed).toFixed(2) } <AttachMoney  sx={{ height: 25, width: 25 }} color="primary" />
                </Typography>
              </Box>
            </Box>
            <Box xs={{display: 'flex'}}>
              <Button variant="outlined">Send all <span>&nbsp;</span><strong>againg</strong></Button>  <span>&nbsp;&nbsp;</span> 
              {
                 message?.message_detail_queue > 0 ?
                 <Button variant="outlined" style={{ 
                  color: 'black',
                  borderColor: 'black',
                  fontWeight: 'bold'
                  }}>Send all <span>&nbsp;</span> <strong>Queue</strong> </Button>
                  : '' 
              }
              <span>&nbsp;&nbsp;</span>
              {
                 message?.message_detail_failed > 0 ?
                 <Button variant="outlined" style={{ 
                  color:COLOR_STATUS_MESSAGE_OBJ['failed'],
                  borderColor:COLOR_STATUS_MESSAGE_OBJ['failed']
                  }}>Send all <span>&nbsp;</span> <strong>Failed</strong> </Button>
                  : '' 
              }
              <span>&nbsp;&nbsp;</span>
              {
                 message?.message_detail_canceled > 0 ?
                 <Button variant="outlined" style={{ 
                    color:COLOR_STATUS_MESSAGE_OBJ['canceled'],
                    borderColor:COLOR_STATUS_MESSAGE_OBJ['canceled']
                  }}>Send all <span>&nbsp;</span> <strong>Canceled</strong> </Button>
                  : '' 
              }
            </Box>
            <Box>
              <MiniTable columns={messagesDetailsColumns(handlerResend)} data={ dataDetail } />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} sx={{ textAlign: { xs: "center", sm: "left"}, }} order={{ xs: 1, sm: 2 }} >
          <Grid container >
            <Grid item elevation={0} xs={12} md={12} display={{ xs: "none", md: "block" }}>
              <Box
                  component={Paper}
                  elevation={0}
                  align="left"
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    mb: 5,
                  }}
                >
                  <Box display="inline-flex" alignItems="center">
                    <Typography variant="h6" fontWeight="500" color="textSecondary">
                    <strong>Graphic </strong>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'grid' }}>
                    <Plot
                      // className="plotly-lines"
                      style={{ width: '100%' }}
                      data={[
                        {
                          labels: statusPie,
                          values: valuesPie,
                          marker: {colors: colorPie},
                          type: "pie",
                          domain: {x: [0.5, 1]},
                          textinfo: "label+value",
                          hoverinfo: 'label+value'
                        }
                      ]}
                      layout={{
                        autosize: true,
                        height: 220,
                        margin:{
                          t:0,
                          b:0,
                          l:10,
                          r:0,
                        },
                        grid:{
                          roworder:'top'
                        },
                        displaylogo: false,
                        displayModeBar: false,
                        showlegend: true,
                        showSources:false
                      }}
                    />
                  </Box>
              </Box>
            </Grid>

            <Grid item elevation={0} xs={12} md={12}>
              <Box
                  component={Paper}
                  elevation={0}
                  align="left"
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    // mb: 5,
                  }}
                  // md={{
                  //   p: 3,
                  // }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      // p: 1,
                      m: 1,
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Grid>
                      <Typography variant="h6" fontWeight="500" color="textSecondary">
                        <strong>Information </strong> 
                      </Typography>
                    </Grid>
                    <Grid p={1} mt={-1.5}>
                      {
                        showInformation ? <ExpandMoreIcon onClick={()=>setShowInformation(false)}/>
                        : <ExpandLessIcon onClick={()=>setShowInformation(true)}/>
                      }
                    </Grid>
                  </Box>
                  {
                    showInformation ? 
                      <Box >
                        <Box sx={{ width: '100%', pl:2, pb:1}}>
                          <Grid sx={{ width: '30%', display: 'inline-block'}}>Message ID</Grid>
                          <Grid sx={{ width: '70%', display: 'inline-block', 
                              p: 0.7, bgcolor: 'grey.300', borderRadius:'10px',
                              textAlign:'center'}} > { message?.id}</Grid>
                        </Box>
                        <Box sx={{ width: '100%', pl:2, pb:1}}>
                          <Grid sx={{ width: '30%', display: 'inline-block'}}>Name</Grid>
                          <Grid sx={{ width: '70%', display: 'inline-block', 
                              p: 0.7, bgcolor: 'grey.300', borderRadius:'10px',
                              textAlign:'center'}} > { message?.user_name}</Grid>
                        </Box>
                        <Box sx={{ width: '100%', pl:2, pb:1}}>
                          <Grid sx={{ width: '30%', display: 'inline-block'}}>Sender</Grid>
                          <Grid sx={{ width: '70%', display: 'inline-block',
                              p: 0.7, bgcolor: 'grey.300', borderRadius:'10px',
                              textAlign:'center'}} > { message?.sender}</Grid>
                        </Box>
                        <Box sx={{ width: '100%', pl:2, pb:1}}>
                          <Grid sx={{ width: '30%', display: 'inline-block'}}>Message</Grid>
                          <Grid sx={{ width: '70%', display: 'inline-block',
                              p: 0.7, bgcolor: 'grey.300', borderRadius:'10px',
                              textAlign:'center'}} > { message?.message}</Grid>
                        </Box>
                        <Box sx={{ width: '100%', pl:2, pb:1}}>
                          <Grid sx={{ width: '30%', display: 'inline-block'}}>IP</Grid>
                          <Grid sx={{ width: '70%', display: 'inline-block',
                              p: 0.7, bgcolor: 'grey.300', borderRadius:'10px',
                              textAlign:'center'}} > { message?.ip}</Grid>
                        </Box>
                        <Box sx={{ width: '100%', pl:2, pb:1}}>
                          <Grid sx={{ width: '30%', display: 'inline-block'}}>Total Message</Grid>
                          <Grid sx={{ width: '70%', display: 'inline-block',
                              p: 0.7, bgcolor: 'grey.300', borderRadius:'10px',
                              textAlign:'center'}} > { message?.message_detail_total}</Grid>
                        </Box>
                      </Box>
                    : ''
                  }
                  
              </Box>
            </Grid>
          </Grid>
        </Grid>
       
      </Grid>
      

    </>
  );
}

export default Detail;

