import React, { useRef, useState, useEffect } from "react";
import "boxicons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Task from "./Task";

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const Calendar = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState("");
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth + 1);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const initialSlideIndex = selectedDay - 1;

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
    setSelectedDay(1);
  };

  useEffect(() => {
    const swiper = document.querySelector(".swiper").swiper;
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [selectedDay]);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.slideTo(0);
    }
  }, [selectedMonth]);

  useEffect(() => {
    const swiper = swiperRef.current.swiper;
    if (swiper) {
      swiper.slideTo(initialSlideIndex, 0);
    }
  }, []);

  useEffect(() => {
    const formattedDate = `${selectedYear}-${String(selectedMonth + 1).padStart(
      2,
      "0"
    )}-${String(selectedDay).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
    console.log(selectedDate);
  }, [selectedDay, selectedMonth, selectedYear]);

  return (
    <section className="calendar">
      <div>
        <select value={selectedYear} onChange={handleYearChange}>
          {[...Array(20)].map((_, index) => (
            <option value={currentYear + index} key={index}>
              {currentYear + index}
            </option>
          ))}
        </select>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <option value={index} key={index}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <section className="swiper-container">
        <button ref={prevRef} className="swiper-prev">
          <box-icon type="solid" name="left-arrow" color="white"></box-icon>
        </button>
        <Swiper
          ref={swiperRef}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={30}
          initialSlide={initialSlideIndex}
        >
          {days.map((day) => (
            <SwiperSlide
              onClick={() => setSelectedDay(day)}
              style={{
                background: day === selectedDay ? "#e825d6" : "#1508c4",
              }}
              className="swiper-slide"
            >
              {day}
            </SwiperSlide>
          ))}
        </Swiper>
        <button ref={nextRef} className="swiper-next">
          <box-icon name="right-arrow" type="solid" color="white"></box-icon>
        </button>
      </section>
      <Task date={selectedDate} />
    </section>
  );
};
export default Calendar;
