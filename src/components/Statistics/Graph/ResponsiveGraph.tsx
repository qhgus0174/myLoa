import React from 'react';
import { ResponsiveContainer } from 'recharts';

const ResponsiveGraph = ({ children }: { children: JSX.Element }) => {
    return (
        <div style={{ position: 'relative', width: '100%', paddingBottom: '300px' }}>
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                }}
            >
                <ResponsiveContainer>{children}</ResponsiveContainer>
            </div>
        </div>
    );
};

export default ResponsiveGraph;
