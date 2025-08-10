"use client";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { useState, useEffect } from "react";
import { DEFAULTS } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/gallery-plugin/index.css";
import { GyroscopePlugin } from "@photo-sphere-viewer/gyroscope-plugin";
import { StereoPlugin } from "@photo-sphere-viewer/stereo-plugin";
import { translations } from "@/config/lang";

export default function PanoramaComp({
    imgSrc = "photos/hriste.jpg",
    title = "Panorama Viewer"
}: {
    imgSrc: string,
    title: string
}) {
    const [loading, setLoading] = useState<boolean>(true);
    const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

    useEffect(() => {
        // Request device orientation permission for iOS 13+
        const requestPermission = async () => {
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
                try {
                    const permission = await (DeviceOrientationEvent as any).requestPermission();
                    setPermissionGranted(permission === 'granted');
                } catch (error) {
                    console.warn('Device orientation permission request failed:', error);
                    setPermissionGranted(false);
                }
            } else {
                // For non-iOS devices or older iOS versions
                setPermissionGranted(true);
            }
        };

        requestPermission();
    }, []);

    const handleReady = () => {
        setLoading(false);
        console.log("PhotoSphere viewer is ready");
    };

    const requestGyroscopePermission = async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                setPermissionGranted(permission === 'granted');
                if (permission === 'granted') {
                    console.log('Gyroscope permission granted');
                } else {
                    console.log('Gyroscope permission denied');
                }
            } catch (error) {
                console.error('Error requesting gyroscope permission:', error);
            }
        } else {
            setPermissionGranted(true);
            console.log('Device orientation permission not required or already available');
        }
    };

    return (
        <div className="h-full w-full relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <p>Loading panorama...</p>
                </div>
            )}
            {!permissionGranted && !loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-20">
                    <p className="mb-4 text-center px-4">
                        Pro použití gyroskopové navigace je potřeba povolit přístup k senzorům zařízení.
                    </p>
                    <button
                        onClick={requestGyroscopePermission}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Povolit gyro navigaci
                    </button>
                </div>
            )}
            <ReactPhotoSphereViewer
                src={imgSrc}
                height="100%"
                width="100%"
                onReady={handleReady}
                caption={title}
                touchmoveTwoFingers={true}
                navbar={[
                    /*{
                        id: 'back',
                        title: 'Back',
                        content: "Domů",
                        onClick(viewer) {
                            console.log('Back button clicked');
                        },
                    },*/
                    "zoom",
                    "move",
                    "fullscreen",
                    "caption",
                    "download",
                    "gallery",
                    "gyroscope",
                    "stereo"
                ]}
                keyboard={"always"}
                keyboardActions={{
                    ...DEFAULTS.keyboardActions,
                    "f": (viewer) => viewer.toggleFullscreen(),
                }}
                minFov={10}
                maxFov={90}
                defaultZoomLvl={0}
                lang={translations}
                plugins={[
                    /*GalleryPlugin.withConfig({
                        items:
                            Object.entries(photosConfig).map(([key, photo]) => ({
                                id: key,
                                name: photo.caption,
                                panorama: photo.src,
                                thumbnail: photo.thumbnail,
                            }))
                        ,
                    }),*/
                    GyroscopePlugin.withConfig({
                        touchmove: true,
                        absolutePosition: true,
                    }),
                    StereoPlugin
                ]}
            />
        </div>
    );
}