using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Paragraph.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Paragraph.Controllers
{
    [Route("api/[controller]")]
    public class ParaController : Controller
    {
        private ParaDataAccessLayer accessLayer = new ParaDataAccessLayer();
        public sealed class IdPost
        {
            public int Id { get; set; }
        }

        [HttpGet]
        [Route("GetParasText")]
        public IEnumerable<string> GetParasText()
        {
            return accessLayer.GetParasText();
        }

        [HttpGet]
        [Route("Init")]
        public ActionResult Init()
        {
            return new JsonResult(accessLayer.Init());
        }

        [HttpGet]
        [Route("GetParaState")]
        public ActionResult GetParaState()
        {
            return new JsonResult(accessLayer.GetParaState());
        }

        [HttpPost]
        [Route("MoveLeft")]
        public ActionResult MoveLeft([FromBody] IdPost obj)
        {
            return new JsonResult(accessLayer.MoveLeft(obj.Id));
        }

        [HttpPost]
        [Route("MoveRight")]
        public ActionResult MoveRight( [FromBody] IdPost obj)
        {
            return new JsonResult(accessLayer.MoveRight(obj.Id));
        }
    }
}
