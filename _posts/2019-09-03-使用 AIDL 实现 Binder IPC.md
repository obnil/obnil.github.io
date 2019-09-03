---
layout: post
title:  "使用 AIDL 实现 Binder IPC"
description: "客户端提供两个数字调用服务端进行加减法，服务端实现加减法的逻辑运算并返回结果给客户端"
categories: android
date:   2019-09-03 09:40:42 +0800
---

客户端提供两个数字调用服务端进行加减法，服务端实现加减法的逻辑运算并返回结果给客户端。该项目由两个工程ipc_server(服务端)和ipc_client(客户端)组成，会分别编译成两个apk，完成跨进程通信。

## 服务端

**新建ICalculator.aidl文件，编译的时候会自动生成ICalculator.java文件**

```java
package me.obnil.ipc;

// Declare any non-default types here with import statements

interface ICalculator {
    /**
     * Demonstrates some basic types that you can use as parameters
     * and return values in AIDL.
     */
    void basicTypes(int anInt, long aLong, boolean aBoolean, float aFloat,
            double aDouble, String aString);

    int add(int a, int b);
    int minus(int a, int b);

}
```

**新建CalculatorService.java**

```java
package me.obnil.ipc_server;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.os.Parcel;
import android.os.RemoteException;
import android.util.Log;

import me.obnil.ipc.ICalculator;

public class CalculatorService extends Service {
    String TAG = "CalculatorService";

    private static final String PACKAGE_SAYHI = "me.obnil.ipc_client";
    public CalculatorService() {
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    private ICalculator.Stub mBinder = new ICalculator.Stub() {
        @Override
        public void basicTypes(int anInt, long aLong, boolean aBoolean, float aFloat, double aDouble, String aString) throws RemoteException {

        }

        @Override
        public int add(int a, int b) throws RemoteException {
            Log.d(TAG,"add: a="+a+",b="+b);
            return a + b;
        }

        @Override
        public int minus(int a, int b) throws RemoteException {
            Log.d(TAG,"minus: a="+a+",b="+b);
            return a - b;
        }

        //在这里可以做权限认证，return false意味着客户端的调用就会失败，比如下面，只允许包名为me.obnil.ipc_client的客户端通过，
        //其他apk将无法完成调用过程
        @Override
        public boolean onTransact(int code, Parcel data, Parcel reply, int flags)
                throws RemoteException {
            String packageName = null;
            String[] packages = CalculatorService.this.getPackageManager().
                    getPackagesForUid(getCallingUid());
            if (packages != null && packages.length > 0) {
                packageName = packages[0];
            }
            Log.d(TAG, "onTransact: " + packageName);
            if (!PACKAGE_SAYHI.equals(packageName)) {
                Log.d(TAG, "wrong packageName,onTransact is not allowed");
                return false;
            }
            Log.d(TAG, "right packageName,onTransact is allowed");
            return super.onTransact(code, data, reply, flags);
        }
    };
}
```

**在AndroidManifest.xml中配置service并暴露给其他进程调用android:exported="true"**

```java
<service
    android:name="me.obnil.ipc_server.CalculatorService"
    android:exported="true">
    <intent-filter>
        <action android:name="com.obnil.ipc_server.CalculatorService"/>
    </intent-filter>
</service>
```

## 客户端

**将服务端的aidl文件拷贝过来**

**新建MainActivity.java并实现点击事件完成绑定service，解除绑定service，调用服务端实现加减法并显示结果(<u>android 5.0以上需要设置包名，否则隐式启动service会报错</u>)**

```java
package me.obnil.ipc_client;

import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.os.RemoteException;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import me.obnil.ipc.ICalculator;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private static final String ACTION_CALCULATOR_SERVICE = "com.obnil.ipc_server.CalculatorService";
    private Button mBindBtn;
    private Button mUnbindBtn;
    private Button mAddBtn;
    private Button mMinusBtn;
    private TextView mResultTv;

    private ICalculator mCalculator;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mBindBtn = (Button) findViewById(R.id.bind_service);
        mUnbindBtn = (Button) findViewById(R.id.unbind_service);
        mAddBtn = (Button) findViewById(R.id.add);
        mMinusBtn = (Button) findViewById(R.id.minus);
        mResultTv = (TextView) findViewById(R.id.result);

        mBindBtn.setOnClickListener(this);
        mUnbindBtn.setOnClickListener(this);
        mAddBtn.setOnClickListener(this);
        mMinusBtn.setOnClickListener(this);
    }

    @Override
    protected void onDestroy() {
        unbindService(mServiceConnection);
        super.onDestroy();
    }

    private ServiceConnection mServiceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            mCalculator = ICalculator.Stub.asInterface(service);
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            mCalculator = null;
        }
    };

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.bind_service:
                Intent intent = new Intent(ACTION_CALCULATOR_SERVICE);
                intent.setPackage("me.obnil.ipc_server");
                boolean bindSuccess = bindService(intent, mServiceConnection, BIND_AUTO_CREATE);
                if (bindSuccess) {
                    Toast.makeText(MainActivity.this, "bindService success!", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(MainActivity.this, "bindService failed!", Toast.LENGTH_SHORT).show();
                }
                break;
            case R.id.unbind_service:
                unbindService(mServiceConnection);
                break;
            case R.id.add:
                int result = 0;
                try {
                    if (mCalculator != null) {
                        result = mCalculator.add(2, 1);
                    } else {
                        result = -1;
                    }
                } catch (RemoteException e) {
                    e.printStackTrace();
                }
                mResultTv.setText(result + "");
                break;
            case R.id.minus:
                int _result = 0;
                try {
                    if (mCalculator != null) {
                        _result = mCalculator.minus(2, 1);
                    } else {
                        _result = -1;
                    }
                } catch (RemoteException e) {
                    e.printStackTrace();
                }
                mResultTv.setText(_result + "");
                break;
        }
    }
}
```

#### 测试结果

1、卸载ipc_server后，ipc_client绑定服务会提示failed(Unable to start service Intent { act=com.obnil.ipc_server.CalculatorService pkg=me.obnil.ipc_server } U=0: not found)，client调用加减法不成功显示-1

> 06-15 12:44:12.885 1069-2253/? W/ActivityManager: Unable to start service Intent { act=com.obnil.ipc_server.CalculatorService pkg=me.obnil.ipc_server } U=0: not found

2、安装ipc_server后，ipc_client绑定服务会成功，会打印日志（right packageName,onTransact is allowed）加减操作正常显示3和1

> 06-15 12:46:50.105 28935-28955/me.obnil.ipc_server D/CalculatorService: onTransact: me.obnil.ipc_client
> 06-15 12:46:50.105 28935-28955/me.obnil.ipc_server D/CalculatorService: right packageName,onTransact is allowed
> 06-15 12:46:50.105 28935-28955/me.obnil.ipc_server D/CalculatorService: add: a=2,b=1
> 06-15 12:47:00.655 28935-28956/me.obnil.ipc_server D/CalculatorService: onTransact: me.obnil.ipc_client
> 06-15 12:47:00.655 28935-28956/me.obnil.ipc_server D/CalculatorService: right packageName,onTransact is allowed
> 06-15 12:47:00.655 28935-28956/me.obnil.ipc_server D/CalculatorService: minus: a=2,b=1

3、修改ipc_server的onTransact()中的包名权限验证逻辑，不允许me.obnil.ipc_client包名调用，会打印日志（wrong packageName,onTransact is not allowed），client调用加减法不成功显示0

> 06-15 12:47:51.535 29553-29573/me.obnil.ipc_server D/CalculatorService: onTransact: me.obnil.ipc_client
> 06-15 12:47:51.535 29553-29573/me.obnil.ipc_server D/CalculatorService: wrong packageName,onTransact is not allowed

![未命名_meitu_0](https://ws4.sinaimg.cn/large/006tNc79gy1g41ru2lw8dj32le0u0k4e.jpg)



源码地址：[https://github.com/obnil/AIDLDemo](https://github.com/obnil/AIDLDemo)