"use client";
import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner({ success, scanner }) {
  useEffect(() => {
    scanner.current = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: window.innerWidth / 1.5,
        height: window.innerWidth / 1.5,
      },
      fps: 20,
    });
    scanner.current.render(success);

    return () => {
      scanner.current.clear();
    };
  }, []); 

  return <div id="reader"></div>;
}

export default Scanner;
