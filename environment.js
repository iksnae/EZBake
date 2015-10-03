//  ------- PUBLIC MODULE ------- 
/**
Environment
responsible for setting up environment variables
*/
module.exports = function(self, app, express)
{
    if (process.env.OPENSHIFT_NODEJS_IP)
    {
      console.log("configuring OpenShift environment")
      self.ipaddress = null;
      self.port = process.env.OPENSHIFT_NODEJS_PORT
    }
    else if(process.env.PORT)
    {
      console.log("configuring Elastic Beanstalk environment")
      self.ipaddress = null;
      self.port = process.env.PORT;
    }
    else
    {
      console.log("configuring localhost environment")
      self.ipaddress = null;
      self.port = 8000;
    }
};