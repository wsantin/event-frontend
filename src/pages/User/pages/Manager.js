import React, { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router";
import { AttachMoney } from "@mui/icons-material";
import Chip from '@mui/material/Chip';
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from "@emotion/react";
import { Button, ButtonGroup, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDispatch, useSelector } from "react-redux";

import MiniTable from '../../../components/UI/MiniTable'
import { messagesColumns } from '../shared/MessagesColumns'
import { transationsColumns } from '../shared/TransationsColumns'
import { getUserById, getUserDetailsBasicById} from '../../../api/User'

import SelectFieldM from '../../../components/UI/molecules/SelectField'
import TextFieldM from '../../../components/UI/molecules/TextField'

// import { fetchGoldsKarats } from "../redux/slices/goldsKaratsSlice";
// import EditPricesForm from "../components/Manager/EditPricesForm";
// import PricesTable from "../components/Manager/PricesTable";

function Manager(props) {
  const { userType } = useParams();
  const history = useHistory();
  const theme = useTheme();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const userId  = history.location.state?.userId || null

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [ data, setData] = useState([])
  const [ dataDetail, setDataDetail] = useState(null)
  const [ dataDetailMessages, setDataDetailMessages] = useState([])
  const [ dataDetailTransactions, setDataDetailTransactions] = useState([])

  const onSubmit = async (data) => {
    console.log("DATA: ",data)
    // setIsLoading(true)
    // try {
    //   const requestLogin = await postSignup(data)
      
    //   localStorage.setItem("token", requestLogin.data);
    //   enqueueSnackbar('success', { 
    //     variant: 'success', 
    //     anchorOrigin: {
    //         vertical: 'top',
    //         horizontal: 'right',
    //     },
    //     autoHideDuration: 1200,
    //     preventDuplicate: true,
    //     ransitionComponent: Grow,
    //   });
    //   setIsLoading(false)
    //   setTimeout(() =>{
    //     history.push("/dashboard");
    //   }, 1200)
      
    // } catch (error) {
    //   setIsLoading(false)
    //   if(error.data?.error?.code === 'required_code_activate'){
    //     history.push("/recovery-password");
    //     return
    //   }
    //   const code = error.data?.error?.code || null
    //   enqueueSnackbar(code ? code: 'Error' , { 
    //     variant: 'error', 
    //     anchorOrigin: {
    //         vertical: 'top',
    //         horizontal: 'right',
    //     },
    //     autoHideDuration: 2000,
    //     preventDuplicate: true,
    //     ransitionComponent: Grow,
    //   });
      
    //   // if(error.data?.error?.code === 'access_invalid'){
    //   //   history.push("/recovery-password");
    //   //   return
    //   // }
    //   // console.log("ERROR: ",error)
    //   return
    // }
  }

  const { setFieldValue, setFieldTouched, handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .required('Este campo é obrigatório'),
      password: Yup
        .string()
        .required('Este campo é obrigatório'),
    }),
    onSubmit,
  })

  const _getUserById = useCallback(() => {
    setIsLoading(true);
    getUserById(userId)
      .then((res) => {
        const { data } = res;
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [userId]);

  const _getUserDetailsBasicById = useCallback(() => {
    setIsLoadingDetail(true)
    getUserDetailsBasicById(userId)
      .then((res) => {
        const { data } = res;
        setDataDetail(data);
        setDataDetailMessages(data.messages)
        setDataDetailTransactions(data.transations)
        setIsLoadingDetail(false);
      })
      .catch(() => {
        setIsLoadingDetail(false);
      });
  }, [userId]);


  const handlerMessage= useCallback( (messageId)=>{
    console.log("messageId: ",messageId)
    // history.push({pathname: `${type}/manager`});
  }, [])

  const handlerTransaction= useCallback( (transactionId)=>{
    console.log("transactionId: ",transactionId)
    // history.push({pathname: `${type}/manager`});
  }, [])
  
  const handlerRedirectMessage= useCallback( (userId)=>{
    console.log("userId: ",userId)
    history.push({pathname: `/dashboard/messages`});
  }, [])
  
  const handlerRedirectTransaction= useCallback( (userId)=>{
    console.log("userId: ",userId)
    history.push({pathname: `/dashboard/transactions`});
  }, [])

  useEffect( () => {
    console.log("userId: ",userId)
    if(!['customers', 'operators'].includes(userType)){
      history.push('/dashboard');
    }
    
    if(userId){
      _getUserById()
      _getUserDetailsBasicById()
    }
  }, [userType, userId]);

  const handleSelectChange = useCallback((field, value) => {
    setFieldValue(field, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container sx={{ mb: 1 }} sx={{ display: !userId ? 'none': ''}} >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            textAlign: {
              xs: "center",
              sm: "left",
            },
          }}
        >
          <Box sx={{ mt: { xs: 1, sm: 0 } }}>
            <Typography variant="h5" fontWeight="600" color="textSecondary">
              {
                !userId ? <TextField
                  margin="normal"
                  label="name"
                  // fullWidth
                  sx={{
                    // display: "block",
                    borderRadius: "6px 6px 6px 6px",
                    color: theme.palette.primary.main,
                  }}
                  variant="filled"
                  
                  required
                  id="name"
                  name="name"
                  autoComplete="enamemail"
                  autoFocus
                  size="name"
                  value={values.email}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
                :
                data?.name
              }
              
            </Typography>
            <Typography variant="h6" fontWeight="400" color="textSecondary">
              {
                !userId ? <TextField
                  margin="normal"
                  label="username"
                  // fullWidth
                  sx={{
                    // display: "block",
                    borderRadius: "6px 6px 6px 6px",
                    color: theme.palette.primary.main,
                  }}
                  variant="filled"
                  
                  required
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="email@email.com"
                  size="small"
                  value={values.email}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
                :
                data?.email
              }
              {
                data?.status === 'code' ? <Chip label="Eithout Validation Code" />
                : data?.status === 'pending' ? <Chip label="To Activate" />
                : data?.status === 'aproved' ? <Chip label="aproved" style={{background: '#28a745'}}/>
                : data?.status === 'desactivate' ? <Chip label="Disabled" />
                : data?.status === 'desactivate_bot' ? <Chip label="Disabled Bot" />
                : ''
              }

 
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{  textAlign: { xs: "center",  sm: "right",  }, }} display={ { xs: !userId?"none":"block", md:"block"}} >
          <Grid container spacing={5} sx={{
            p: 1,
            textAlign: {
              xs: "center",
              sm: "left",
            },
          }}>
            <Grid item elevation={0} xs={6} md={6}>
              <Box
                component={Paper}
                elevation={0}
                align="center"
                sx={{
                  borderRadius: 3,
                  p: 0.5,
                  mb: 3,
                }}
              >
                <Box>CURRENT BALANCE</Box>
                <Box display="inline-flex" alignItems="center">
                  <Typography variant="h3" fontWeight="500" color="textSecondary">
                    {dataDetail?.current_balance}
                  </Typography>
                  <AttachMoney
                    sx={{ height: 25, width: 25 }}
                    
                  ></AttachMoney>
                </Box>
                {/* <PricesTable tableBody={tableBody} tableHead={tableHead} /> */}
              </Box>
            </Grid>
            <Grid item elevation={0} xs={6} md={6}>
              <Box
                component={Paper}
                elevation={0}
                align="center"
                sx={{
                  borderRadius: 3,
                  p: 0.5,
                  mb: 3,
                }}
              >
                <Box >LAST RECHARGE</Box>
                <Box display="inline-flex" alignItems="center">
                  <Typography variant="h3" fontWeight="500" color="textSecondary">
                  {dataDetail?.last_recharge}
                  </Typography>
                  <AttachMoney
                    sx={{ height: 25, width: 25 }}
                    
                  ></AttachMoney>
                </Box>
                {/* <PricesTable tableBody={tableBody} tableHead={tableHead} /> */}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid container spacing={5} >
        <Grid item elevation={0} xs={12} md={!userId?10:5}>
          <Box
              component={Paper}
              elevation={0}
              // align="center"
              sx={{
                borderRadius: 3,
                p: 3,
                mb: 5,
              }}
            >
              
              <Box sx={{ pb: 2, display: userId ? 'none': '' }} >
                <Box display="inline-flex" alignItems="center">
                  <Typography variant="h6" fontWeight="500" color="textSecondary">
                    <strong>Account Access </strong>
                  </Typography>
                </Box>

                <Box>
                  <Grid container sx={{ pb:1}} >
                    <Grid xs={4} pt={1}> Username </Grid>
                    <Grid xs={8} > 
                      <TextFieldM
                        id="email"
                        name="email"
                        placeholder="email@email.com"
                        value={values.email}
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required
                      />
                    </Grid>
                  </Grid>
                  <Grid container sx={{ pb:1}} >
                    <Grid xs={4} pt={1}> Password </Grid>
                    <Grid xs={8} > 
                      <TextFieldM
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required
                      />
                    </Grid>
                  </Grid>
                  {/* <Grid container sx={{ pb: !userId?0:1}}  >
                    <Grid xs={4} pt={!userId?2.5:0}> Nivel  </Grid>
                    <Grid xs={8} > 
                      <SelectFieldM
                        id="nivel"
                        name="nivel"
                        items={[{"id": "1", "description":"customer"}, {"id": "2", "description":"operators"}]}
                        // label="Asociación"
                        itemValue="id"
                        itemText="description"
                        value={values.nivel}
                        onChange={handleSelectChange}
                      /> 
                    </Grid>
                  </Grid> */}
                </Box>
              </Box>

              <Box display="inline-flex" alignItems="center">
                <Typography variant="h6" fontWeight="500" color="textSecondary">
                  <strong>Information </strong>
                </Typography>
              </Box>

              <Box >
               
                <Grid container sx={{ pb: !userId?0:1, display: !userId ? 'none': '' }}  >
                  <Grid xs={4} pt={!userId?2.5:0}> Code Afiliate </Grid>
                  <Grid xs={8} sx={{ p: 0.7, bgcolor: 'grey.300', borderRadius:'10px', textAlign:'center' }} > 
                    { data?.code_affiliate }
                  </Grid>
                </Grid>

                

                <Grid container sx={{ pb: !userId?0:1}}  >
                  <Grid xs={4} pt={!userId?2.5:0}> Name  </Grid>
                  {
                    !userId ? 
                      <Grid xs={8} > 
                        <TextFieldM
                          id="name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          errors={errors}
                          touched={touched}
                          required
                          placeholder="Name"
                        /> 
                      </Grid>
                    : 
                    <Grid xs={8} sx={{ p: 0.7, bgcolor: 'grey.300', borderRadius:'10px', textAlign:'center' }} > 
                     { data?.name }
                    </Grid>
                  }
                </Grid>

                <Grid container sx={{ pb: !userId?0:1}}  >
                  <Grid xs={4} pt={!userId?2.5:0}> Telegram  </Grid>
                  {
                    !userId ? 
                      <Grid xs={8} > 
                        <TextFieldM
                          id="telegram"
                          name="telegram"
                          value={values.telegram}
                          onChange={handleChange}
                          errors={errors}
                          touched={touched}
                          required
                          placeholder="@usuario"
                        /> 
                      </Grid>
                    : 
                    <Grid xs={8} sx={{ p: 0.7, bgcolor: 'grey.300', borderRadius:'10px', textAlign:'center' }} > 
                     { data?.telegram }
                    </Grid>
                  }
                </Grid>
                
                <Box sx={{ width: '100%', pl:2, pb:1, display: !userId ? 'none': '' }}>
                  <Grid sx={{ width: '30%', display: 'inline-block'}}>Email</Grid>
                  <Grid sx={{ width: '70%', display: 'inline-block',
                      p: 0.7, bgcolor: 'grey.300', borderRadius:'10px',
                      textAlign:'center'}} > { data?.email}</Grid>
                </Box>

                <Grid container sx={{ pb: !userId?0:1}}  >
                  <Grid xs={4} pt={!userId?2.5:0}> Sender default  </Grid>
                  {
                    !userId ? 
                      <Grid xs={8} > 
                        <TextFieldM
                          id="sender_default"
                          name="sender_default"
                          value={values.sender_default}
                          onChange={handleChange}
                          errors={errors}
                          touched={touched}
                          required
                          placeholder="Sender"
                        /> 
                      </Grid>
                    : 
                    <Grid xs={8} sx={{ p: 0.7, bgcolor: 'grey.300', borderRadius:'10px', textAlign:'center' }} > 
                     { data?.sender_default }
                    </Grid>
                  }
                </Grid>
                
                <Grid container sx={{ pb: !userId?0:1, display: !userId ? 'none': '' }}  >
                  <Grid xs={4} pt={!userId?2.5:0}> Api Key </Grid>
                  <Grid xs={8} sx={{ p: 0.7, bgcolor: 'grey.300', borderRadius:'10px', textAlign:'center' }} > 
                    { data?.api_key }
                  </Grid>
                </Grid>

                <Grid container sx={{ pb: !userId?0:1, display: !userId ? 'none': '' }}  >
                  <Grid xs={4} pt={!userId?2.5:0}> Api Secret </Grid>
                  <Grid xs={8} sx={{ p: 0.7, bgcolor: 'grey.300', borderRadius:'10px', textAlign:'center' }} > 
                    { data?.api_secret }
                  </Grid>
                </Grid>
                
                <Grid container sx={{ pb: !userId?0:1}}  >
                  <Grid xs={4} pt={!userId?2.5:0}> status </Grid>
                  {
                    !userId ? 
                      <Grid xs={8} > 
                        <SelectFieldM
                          id="status"
                          name="status"
                          items={[
                            {"id": "schedule", "description":"customer"}, 
                            {"id": "create", "description":"operators"},
                            {"id": "create", "description":"operators"},
                            {"id": "create", "description":"operators"},
                            {"id": "create", "description":"operators"},
                            {"id": "create", "description":"operators"},
                            
                          ]}
                          // label="Asociación"
                          itemValue="id"
                          itemText="description"
                          value={values.status}
                          onChange={handleSelectChange}
                        /> 
                      </Grid>
                    : 
                    <Grid xs={8} sx={{ p: 0.7, bgcolor: 'grey.300', borderRadius:'10px', textAlign:'center' }} > 
                     { data?.status }
                    </Grid>
                  }
                </Grid>

                <Box sx={{ width: '100%', pl:2, pb:1}}>
                  <Grid sx={{ width: '30%', display: 'inline-block'}}>status</Grid>
                  <Grid sx={{ width: '70%', display: 'inline-block',
                      p: 0.7, bgcolor: 'grey.300', borderRadius:'10px',
                      textAlign:'center'}} > { data?.status}</Grid>
                </Box>
                <Box sx={{ width: '100%', pl:2, pb:1}}>
                  <Grid sx={{ width: '30%', display: 'inline-block'}}>Observation</Grid>
                  <Grid sx={{ width: '70%', display: 'inline-block',
                      p: 0.7, bgcolor: 'grey.300', borderRadius:'10px',
                      textAlign:'center'}} > { data?.observation}</Grid>
                </Box>
              </Box>
              {/* <PricesTable tableBody={tableBody} tableHead={tableHead} /> */}
          </Box>
        </Grid>
        
        <Grid item elevation={0} xs={12} md={7} display={ { xs: !userId?"none":"block"}}>
          <Box
            component={Paper}
            elevation={0}
            // align="center"
            mb={1}
            sx={{
              borderRadius: 3,
              p: 3,
              mb: 5,
            }}
          >
            <Box display="inline-flex" alignItems="center">
              <Typography variant="h6" fontWeight="500" color="textSecondary">
                <strong>Recent messages Send </strong> <Button onClick={()=>handlerRedirectMessage(userId)}> View all Message </Button>
              </Typography>
            </Box>
            <Box>
              <MiniTable columns={messagesColumns(handlerMessage)} data={ dataDetailMessages} loading={isLoadingDetail}/>
            </Box>
          </Box>

          <Box
            component={Paper}
            elevation={0}
            // align="center"
            mb={3}
            sx={{
              borderRadius: 3,
              p: 3,
              mb: 5,
            }}
          >
            <Box display="inline-flex" alignItems="center">
              <Typography variant="h6" fontWeight="500" color="textSecondary">
              <strong>Recent Transactions </strong> <Button onClick={()=>handlerRedirectTransaction(userId)}> View all transation </Button>
              </Typography>
            </Box>
            <Box>
              <MiniTable columns={transationsColumns(handlerTransaction)} data={dataDetailTransactions} loading={isLoadingDetail}/>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </>
  );
}

export default Manager;

