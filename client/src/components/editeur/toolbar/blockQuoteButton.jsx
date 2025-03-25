
export default function BlockQuoteButton(props){
    return (
         <button  className={`pl-2 cursor-pointer ${props.editor.isActive('blockquote') ? 'text-black' : 'text-neutral-500'}`}
            onClick={() => props.editor.chain().focus().toggleBlockquote().run()}>
<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 255.000000 227.000000" preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,227.000000) scale(0.078431,-0.088111)" fill={props.editor.isActive('blockquote') ? '#2d2d2d' : ' #707778'} stroke="none">
<path d="M356 2100 c-120 -36 -130 -215 -16 -272 33 -17 100 -18 964 -18 912 0 930 0 971 20 58 28 79 70 73 144 -5 66 -39 110 -97 126 -45 12 -1853 12 -1895 0z"/>
<path d="M345 1346 c-16 -7 -41 -26 -55 -41 l-25 -27 -3 -431 c-2 -414 -1 -433 17 -464 42 -68 120 -90 193 -54 80 38 78 23 78 509 l0 430 -27 33 c-46 55 -116 72 -178 45z"/>
<path d="M940 1342 c-19 -9 -45 -33 -58 -52 -20 -29 -23 -44 -20 -93 4 -49 9 -63 36 -90 l32 -32 650 -5 c358 -3 663 -2 678 2 15 4 41 21 57 38 27 29 30 38 30 100 0 59 -3 72 -25 95 -51 56 -38 55 -717 55 -578 0 -631 -1 -663 -18z"/>
<path d="M940 592 c-107 -53 -107 -211 0 -264 32 -17 85 -18 663 -18 679 0 666 -1 717 55 22 23 25 36 25 95 0 59 -3 72 -25 95 -51 56 -38 55 -717 55 -578 0 -631 -1 -663 -18z"/>
</g>
</svg>
 
        </button>
    )       
}