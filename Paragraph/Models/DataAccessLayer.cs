using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Paragraph.Models
{
    public class ParaDataAccessLayer
    {
        ParagraphDBContext db = new ParagraphDBContext();

        public IEnumerable<string> GetParasText()
        {
            try
            {
                return db.Para.Where(p => db.ParaRight.Any(pr => pr.ParaId == p.ParaId)).Select(res => res.ParaText);
            }
            catch
            {
                throw;
            }
        }

        public ActionResult Init()
        {
            try
            {
                db.Database.ExecuteSqlCommand("dbo.ProcInit");
                db.SaveChanges();
                return new JsonResult(new { success = true });
            }
            catch
            {
                throw;
            }
        }

        // Get the data necessary to be shown (ParaLeft and ParaRight)
        public ActionResult GetParaState()
        {
            try
            {
                var result = new { ParaLeft = db.ParaLeft.ToList(), ParaRight = db.ParaRight.ToList() };
                return new JsonResult(result);
            }
            catch
            {
                throw;
            }
        }

        public ActionResult MoveLeft(int id)
        {
            try
            {
                var idParam = new SqlParameter("@idParam", id);
                db.Database.ExecuteSqlCommand("dbo.ProcMoveLeft @idParam", idParam);
                db.SaveChanges();

                return new JsonResult(new { success = true });
            }
            catch
            {
                throw;
            }
        }

        public ActionResult MoveRight(int id)
        {
            try
            {
                var idParam = new SqlParameter("@idParam", id);
                db.Database.ExecuteSqlCommand("dbo.ProcMoveRight @IdParam", idParam);
                db.SaveChanges();

                return new JsonResult(new { success = true });
            }
            catch
            {
                throw;
            }
        }
    }
}
