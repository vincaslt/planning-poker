import React from 'react';

interface Props {
  className?: string;
}

function Logo({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <rect
          x="28.6481"
          y="7.22474"
          width="36"
          height="48"
          rx="3"
          transform="rotate(15 28.6481 7.22474)"
          fill="#EDA774"
          stroke="#8E4B42"
          strokeWidth="2"
        />
        <path
          d="M36.0053 38.5074L34.8366 42.8691L38.1344 45.7748L26.9055 42.766L31.247 41.5353L36.4608 26.3032L32.6841 22.3471C33.2289 22.4068 33.7797 22.4843 34.3365 22.5796C34.9034 22.6776 35.4561 22.7879 35.9948 22.9107C36.5462 23.0261 37.0748 23.1462 37.5806 23.2709C38.0965 23.3984 38.5757 23.5214 39.0185 23.64C40.0246 23.9096 41.0163 24.2131 41.9936 24.5504C42.9708 24.8878 43.8852 25.2784 44.7369 25.7223C45.6013 26.1588 46.375 26.6519 47.0581 27.2016C47.7512 27.7539 48.3118 28.3786 48.7397 29.0757C49.1704 29.7626 49.4442 30.5316 49.5613 31.3825C49.6884 32.2362 49.6145 33.1762 49.3395 34.2025C49.0888 35.1382 48.7154 35.9278 48.2195 36.5714C47.7335 37.2177 47.1599 37.7487 46.4984 38.1646C45.8498 38.5732 45.1335 38.8719 44.3495 39.0609C43.5656 39.2498 42.7589 39.3626 41.9295 39.3992C41.1028 39.4257 40.2735 39.3814 39.4416 39.2664C38.6097 39.1513 37.8114 38.9913 37.0467 38.7864L36.0053 38.5074ZM39.3861 25.89L36.4097 36.9981C37.587 37.3136 38.6141 37.4648 39.4911 37.4517C40.3681 37.4387 41.1254 37.3289 41.7631 37.1223C42.4035 36.9056 42.9326 36.6214 43.3504 36.2697C43.7809 35.9105 44.1256 35.5499 44.3843 35.1879C44.6458 34.8158 44.8348 34.4728 44.9512 34.159C45.0804 33.8377 45.1653 33.6016 45.2057 33.4507C45.2596 33.2495 45.3137 32.9674 45.3678 32.6044C45.4346 32.2341 45.4529 31.8238 45.4226 31.3735C45.3923 30.9233 45.2928 30.4491 45.1244 29.951C44.9586 29.4429 44.6699 28.9503 44.2585 28.4734C43.8498 27.9865 43.2978 27.5312 42.6025 27.1077C41.9172 26.6868 41.0413 26.3335 39.9748 26.0477L39.3861 25.89Z"
          fill="#8E4B42"
        />
        <rect
          x="1.15846"
          y="9.40979"
          width="36"
          height="48"
          rx="3"
          transform="rotate(-10 1.15846 9.40979)"
          fill="#74C2ED"
          stroke="#0C4875"
          strokeWidth="2"
        />
        <path
          d="M21.047 34.6522L21.8311 39.0992L26.048 40.3389L14.5996 42.3576L18.0142 39.4073L16.3021 23.3989L11.2074 21.4096C11.7263 21.2335 12.2583 21.0709 12.8032 20.922C13.3583 20.7712 13.906 20.6376 14.446 20.5212C14.9946 20.3928 15.5244 20.2782 16.0355 20.1775C16.5569 20.075 17.0432 19.9839 17.4946 19.9043C18.5205 19.7235 19.5475 19.5794 20.5757 19.4721C21.604 19.3649 22.5978 19.3324 23.5573 19.3748C24.5251 19.4051 25.4348 19.525 26.2862 19.7345C27.1478 19.9422 27.9199 20.2715 28.6023 20.7223C29.2829 21.1629 29.856 21.7441 30.3218 22.4658C30.7978 23.1858 31.128 24.0689 31.3125 25.1153C31.4808 26.0693 31.4761 26.9428 31.2986 27.7357C31.1313 28.5267 30.8359 29.2505 30.4122 29.9069C29.9969 30.5513 29.474 31.1248 28.8433 31.6274C28.2127 32.1299 27.5293 32.5731 26.793 32.9567C26.055 33.3302 25.2847 33.6405 24.4821 33.8878C23.6795 34.1351 22.8884 34.3275 22.1088 34.4649L21.047 34.6522ZM18.7787 21.7881L20.7757 33.1134C21.9759 32.9018 22.9707 32.6047 23.76 32.2223C24.5494 31.8398 25.1893 31.4202 25.68 30.9635C26.1688 30.4965 26.5282 30.0153 26.7582 29.5199C26.9966 29.0125 27.1566 28.54 27.2381 28.1026C27.3178 27.6549 27.3441 27.2641 27.317 26.9304C27.2984 26.5847 27.2755 26.3349 27.2483 26.181C27.2122 25.9758 27.1419 25.6973 27.0376 25.3455C26.9417 24.9816 26.7848 24.6021 26.5671 24.2068C26.3493 23.8115 26.0588 23.4238 25.6956 23.0436C25.3306 22.6531 24.8608 22.3287 24.2864 22.0704C23.7102 21.8018 23.0175 21.6225 22.2083 21.5324C21.4094 21.4406 20.4662 21.4906 19.3789 21.6823L18.7787 21.7881Z"
          fill="#0C4875"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Logo;
