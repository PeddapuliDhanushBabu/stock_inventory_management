import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

import "./StatsCard.css";

export default function StatsCard({
    title,
    value,
    icon,
    color,
    percentage
}) {

    return (

        <motion.div
            className="stats-card"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: .3 }}
        >

            <div
                className="stats-icon"
                style={{ background: color }}
            >
                {icon}
            </div>

            <div className="stats-content">

                <h4>{title}</h4>

                <h2>

                    <CountUp
                        end={value}
                        duration={2}
                        separator=","
                    />

                </h2>

                <span className="growth">

                    ↑ {percentage}% this month

                </span>

            </div>

        </motion.div>

    );

}