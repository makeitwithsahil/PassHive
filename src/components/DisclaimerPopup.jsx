import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DisclaimerPopup = ({ onDismiss }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem("passhive_disclaimer_dismissed");
        if (!dismissed) {
            setShow(true);
        } else {
            onDismiss();
        }
    }, [onDismiss]);

    const handleClose = () => {
        localStorage.setItem("passhive_disclaimer_dismissed", "true");
        setShow(false);
        setTimeout(() => {
            onDismiss();
        }, 200);
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        backgroundColor: "#111827",
                        color: "#f3f4f6",
                        padding: "2rem",
                        borderRadius: "1.5rem",
                        maxWidth: "600px",
                        width: "90%",
                        margin: "2rem auto",
                        fontFamily: "'Segoe UI', sans-serif",
                        boxShadow: "0 0 25px rgba(0,0,0,0.3)",
                        border: "1px solid #374151",
                        position: "relative",
                    }}
                >
                    <h2 style={{
                        color: "#f87171",
                        fontSize: "1.75rem",
                        fontWeight: "600",
                        marginBottom: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        justifyContent: "center",
                    }}>
                        ⚠️ Disclaimer
                    </h2>

                    <ul style={{ lineHeight: "1.9", paddingLeft: "0", listStyle: "none", fontSize: "1rem" }}>
                        <li style={{ marginBottom: "1rem", display: "flex", gap: "0.6rem" }}>
                            <span>🔐</span>
                            <span>Your passwords are <span style={{ color: "#facc15", fontWeight: "600" }}>only saved locally</span> in your browser.</span>
                        </li>
                        <li style={{ marginBottom: "1rem", display: "flex", gap: "0.6rem" }}>
                            <span>🗑️</span>
                            <span>If you <span style={{ color: "#facc15", fontWeight: "600" }}>clear your browser data</span>, all passwords will be lost.</span>
                        </li>
                        <li style={{ marginBottom: "1rem", display: "flex", gap: "0.6rem" }}>
                            <span>🌐</span>
                            <span>Using another browser or device will <span style={{ color: "#facc15", fontWeight: "600" }}>not show your saved passwords</span>.</span>
                        </li>
                        <li style={{ marginBottom: "1rem", display: "flex", gap: "0.6rem" }}>
                            <span>🔒</span>
                            <span>In future updates, we'll add <span style={{ color: "#4ade80", fontWeight: "600" }}>login and cloud storage</span> for safer access across devices.</span>
                        </li>
                    </ul>

                    <p style={{
                        fontSize: "0.85rem",
                        marginTop: "1.5rem",
                        color: "#9ca3af",
                        textAlign: "center",
                        fontStyle: "italic",
                    }}>
                        Your privacy matters — <span style={{ color: "#60a5fa" }}>PassHive</span> does not store or share your data.
                    </p>

                    <button onClick={handleClose} style={{
                        marginTop: "1.5rem",
                        display: "block",
                        backgroundColor: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: "0.5rem",
                        padding: "0.5rem 1rem",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                        Got it!
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DisclaimerPopup;
