import React from 'react';
import ContentLoader from 'react-content-loader';

const ContactFormLoader = () => (
    <ContentLoader
        speed={2}
        width={'100%'}
        height={600}
        className='p-5'
        viewBox="0 0 100% 600"
        backgroundColor="#f3f3f3"
        foregroundColor="#e0e0e0"
    >
        <rect x={'0%'} y={10} rx={0} ry={0} width={'30%'} height={30} radius={10} />
        <rect x={'0%'} y={50} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'0%'} y={110} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'0%'} y={170} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'0%'} y={230} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'0%'} y={290} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'0%'} y={350} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'0%'} y={410} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'52%'} y={50} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'52%'} y={110} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'52%'} y={170} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'52%'} y={230} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'52%'} y={290} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'52%'} y={350} rx={0} ry={0} width={'50%'} height={50} />
        <rect x={'52%'} y={410} rx={0} ry={0} width={'50%'} height={50} />
    </ContentLoader>
);

export default ContactFormLoader;