using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApi.Models.WeekModel
{
    public class WeekModel
    {
        public List<ScreeningExt> Day1 { get; set; }
        public List<ScreeningExt> Day2 { get; set; }
        public List<ScreeningExt> Day3 { get; set; }
        public List<ScreeningExt> Day4 { get; set; }
        public List<ScreeningExt> Day5 { get; set; }
        public List<ScreeningExt> Day6 { get; set; }
    }
}
