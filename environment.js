//  ------- PUBLIC MODULE ------- 
/**
Environment
responsible for setting up environment variables
*/
module.exports = function(self, app, express)
{
    if (process.env.OPENSHIFT_NODEJS_IP)
    {
      // console.log("EZBake: setting up kitchen: OpenShift");
      self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
      self.port = process.env.OPENSHIFT_NODEJS_PORT
    }
    else if(process.env.PORT)
    {
      // console.log("EZBake: setting up kitchen: Elastic Beanstalk");
      self.ipaddress = null;
      self.port = process.env.PORT;
    }
    else
    {
      // console.log("EZBake: setting up kitchen: localhost");
      self.ipaddress = null;
      self.port = 8000;
    }
};