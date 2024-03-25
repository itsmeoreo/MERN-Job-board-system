import Company from "../models/companyModels.js";
import Job from "../models/jobModel.js";
import Notification from "../models/notificationModel.js";
import Provider from "../models/providerModels.js";
import Seeker from "../models/seekersModel.js";

const postNewNotification= async( req, res )=> {
  try{
    if(req.params.content === "1"){
      const applicant= await Seeker.findOne({username: req.user.username})
      const job= await Job.findById(req.params.job)
      const content= `${applicant.name} have applied to ${job.position}`
      try {
        await Notification.create({
          content: content,
          sender_id: `${applicant.id}`,
          receiver_id: req.params.receiver,
          job: `${job.id}`
        })
        res.status(200).json({success: "Notification posted successfully"})
      } catch (error) {
        res.status(400).json({error: "error.message"})
      }
    }
    else{
      const job= await Job.findById(req.params.job)
      const jobProvider= await Company.findById(job.company_or_provider) || await Provider.findById(job.company_or_provider)
      const content= `You're application have been selected for ${job.position} in/by ${jobProvider.company_name || jobProvider.username}`
      try {
        await Notification.create({
          content: content,
          sender_id: `${jobProvider.id}`,
          receiver_id: req.params.receiver,
          job: job.id
        })
        res.status(200).json({success: "Notification posted successfully"})
      } catch (error) {
        res.status(400).json({error: "error.message"})
      }
    }
  }
  catch(error){
    res.status(400).json({error: error.message})
  }
}

const getAllNotifications= async( req, res )=> {
  const user= await Seeker.findOne({username:req.user.username}) || await Company.findOne({company_name:req.user.company_name}) || await Provider.findOne({username:req.user.username})
  try{
    const notifications= await Notification.find({receiver_id: user.id})
    if(notifications==={})
      res.status(200).json({empty: "You have no notifications"})
    else
      res.status(200).send(notifications)
  }
  catch (error) {
    res.status(400).json({error: error.message})
  }
}

const notificationSeen= async( req, res )=> {
  const user= await Seeker.findOne({username:req.user.username}) || await Company.findOne({company_name:req.user.company_name}) || await Provider.findOne({username:req.data.username})
  const notification= await Notification.findById(req.params.notification)
  if(notification.receiver_id === user.id){
    try {
      await Notification.findByIdAndUpdate(req.params.notification,{
        seen: true
      })
      res.status(200).json({success: "Notification seen"})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  else{
    res.status(400).json({invalid: "You are not authorised to see this notification"})
  }
}

export default { postNewNotification, getAllNotifications, notificationSeen }